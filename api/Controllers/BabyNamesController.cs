using BabyNamesApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace BabyNameApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BabyNameController : ControllerBase
    {
        private readonly BabyNamesService _babyNameService;

        public BabyNameController(BabyNamesService babyNameService)
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

    }
}
