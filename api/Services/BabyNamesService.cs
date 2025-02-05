using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
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
    }
}
