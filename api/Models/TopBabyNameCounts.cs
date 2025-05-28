namespace BabyNamesApi.Models;

public class TopBabyNameCounts
{
    public IEnumerable<PieChartDateItem> Male { get; set; }
    public IEnumerable<PieChartDateItem> Female { get; set; }
}