using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using BabyNameApi.Dtos;
using BabyNamesApi.Data;
using BabyNamesApi.Models;
using Microsoft.EntityFrameworkCore;

namespace BabyNamesApi.Services
{
    public class BabyNamesService
    {
        private readonly BabyNamesDbContext _dbContext;

        public BabyNamesService(BabyNamesDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public int ImportBabyNames(string directoryPath)
        {
            try
            {
                const int batchSize = 50000;
                var files = Directory.GetFiles(directoryPath, "*.TXT");

                foreach (var file in files)
                {
                    var insertQueries = new List<string>();

                    var lines = File.ReadAllLines(file);

                    foreach (var line in lines)
                    {
                        var parts = line.Split(',');

                        // Build the SQL insert statement with INSERT IGNORE
                        var stateCode = parts[0];
                        var genderCode = parts[1];
                        var birthYear = int.Parse(parts[2]);
                        var firstName = parts[3];
                        var nameCount = int.Parse(parts[4]);

                        var query = $@"
                            ('{stateCode}', '{genderCode}', {birthYear}, '{firstName}', {nameCount})";
                        insertQueries.Add(query);

                        // Execute batch when the batch size is reached
                        if (insertQueries.Count == batchSize)
                        {
                            ExecuteBatchInsert(insertQueries);
                            insertQueries.Clear();
                        }
                    }

                    // Execute any remaining queries after the last batch
                    if (insertQueries.Count > 0)
                    {
                        ExecuteBatchInsert(insertQueries);
                    }
                }

                // Return the full row count from the BabyNames table
                int rowCount = _dbContext.BabyNames.Count();
                return rowCount;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Error importing baby names with batch INSERT IGNORE.", ex);
            }
        }

        private void ExecuteBatchInsert(List<string> insertQueries)
        {
            var baseQuery = @"INSERT IGNORE INTO baby_names (state_code, gender_code, birth_year, first_name, name_count) VALUES ";
            var combinedQuery = baseQuery + string.Join(",", insertQueries) + ";";

            _dbContext.Database.ExecuteSqlRaw(combinedQuery);
        }

        public IEnumerable<BabyName> FirstThousand()
        {
            return _dbContext.BabyNames.Take(1000).AsEnumerable();
        }

        public int Count()
        {
            return _dbContext.BabyNames.Count();
        }

        public int DeleteAll()
        {
            return _dbContext.Database.ExecuteSqlRaw("DELETE FROM baby_names");
        }

        public MinMaxYearDto MinMaxYearsUsingState(string stateCode)
        {
            if (string.IsNullOrWhiteSpace(stateCode))
                return new MinMaxYearDto { MinYear = 0, MaxYear = 0 };

            int minYear = _dbContext.BabyNames
                .Where(x => x.StateCode == stateCode)
                .Min(x => x.BirthYear);

            int maxYear = _dbContext.BabyNames
                .Where(x => x.StateCode == stateCode)
                .Max(x => x.BirthYear);

            return new MinMaxYearDto { MinYear = minYear, MaxYear = maxYear };
        }

        public Tuple<int, int> GetMaleFemaleCount(string stateCode, int year)
        {
            if (string.IsNullOrWhiteSpace(stateCode))
                return new Tuple<int, int>(0, 0);

            var maleCount = _dbContext.BabyNames
                .Where(x => x.StateCode == stateCode && x.BirthYear == year && x.GenderCode == "M")
                .Sum(x => x.NameCount);

            var femaleCount = _dbContext.BabyNames
                .Where(x => x.StateCode == stateCode && x.BirthYear == year && x.GenderCode == "F")
                .Sum(x => x.NameCount);

            return new Tuple<int, int>(maleCount, femaleCount);
        }

        public TopBabyNameCounts TopPopularMaleFemaleCounts(string stateCode, int year)
        {
            const int top = 5;

            if (string.IsNullOrWhiteSpace(stateCode))
                throw new ArgumentException("State code cannot be null or empty.", nameof(stateCode));

            if (year <= 0)
                throw new ArgumentException("Year must be a positive integer.", nameof(year));

            TopBabyNameCounts topBabyNameCounts = new TopBabyNameCounts();

            IEnumerable<BabyName> enumeratedTopMales = _dbContext.BabyNames
                .Where(x => x.StateCode == stateCode && x.BirthYear == year && x.GenderCode == "M")
                .OrderByDescending(x => x.NameCount)
                .Take(top)
                .AsEnumerable();

            topBabyNameCounts.Male = enumeratedTopMales
                .Select((x, i) => new PieChartDateItem
                {
                    Id = i + 1, // 1-based index for Id
                    Value = x.NameCount,
                    Label = x.FirstName
                });


            IEnumerable<BabyName> enumeratedTopFemales = _dbContext.BabyNames
                .Where(x => x.StateCode == stateCode && x.BirthYear == year && x.GenderCode == "F")
                .OrderByDescending(x => x.NameCount)
                .Take(top)
                .AsEnumerable();

            topBabyNameCounts.Female = enumeratedTopFemales
                .Select((x, i) => new PieChartDateItem
                {
                    Id = i + 1, // 1-based index for Id
                    Value = x.NameCount,
                    Label = x.FirstName
                });

            return topBabyNameCounts;
        }

        public IEnumerable<YearGenderCount> GetYearGenderCounts(int minYear, int maxYear,  string stateCode)
        {
            if (minYear <= 0 || maxYear <= 0 || minYear > maxYear)
                throw new ArgumentException("Invalid year range provided.");

            IEnumerable<YearGenderCount> yearGenderCounts = _dbContext.BabyNames
                .Where(x => x.BirthYear >= minYear && x.BirthYear <= maxYear && x.StateCode == stateCode)
                .GroupBy(x => new { x.BirthYear })
                .Select(g => new YearGenderCount
                {
                    Year = g.Key.BirthYear,
                    MaleCount = g.Where(x => x.GenderCode == "M").Sum(x => x.NameCount),
                    FemaleCount = g.Where(x => x.GenderCode == "F").Sum(x => x.NameCount)
                })
                .OrderBy(x => x.Year)
                .AsEnumerable();

            return yearGenderCounts;
        }
    }
}
