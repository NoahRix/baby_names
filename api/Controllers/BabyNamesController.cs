using BabyNameApi.Dtos;
using BabyNamesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BabyNameApi.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BabyNamesController : ControllerBase
    {
        private readonly BabyNamesService _babyNameService;

        public BabyNamesController(BabyNamesService babyNameService)
        {
            _babyNameService = babyNameService;
        }

        [HttpGet("import")]
        public IActionResult ImportData()
        {
            int numberOfTotalRowsAfterImport = _babyNameService.ImportBabyNames("./baby_name_data");
            return Ok($"Data imported successfully. {numberOfTotalRowsAfterImport} total rows(s).");
        }

        [HttpGet("first-thousand")]
        public IActionResult FirstThousand()
        {
            var babyNames = _babyNameService.FirstThousand();
            return Ok(babyNames);
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var count = _babyNameService.Count();
            return Ok(count);
        }

        [HttpGet("delete-all")]
        public IActionResult DeleteAll()
        {
            var count = _babyNameService.DeleteAll();
            return Ok(count);
        }       

        [HttpGet("min-max-years-using-state")]
        public IActionResult MinMaxYearsUsingState(string stateCode)
        {
            MinMaxYearDto minMaxYearDto = _babyNameService.MinMaxYearsUsingState(stateCode);
            return Ok(minMaxYearDto);
        }            
    }
}
