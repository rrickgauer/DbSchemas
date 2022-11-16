using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;

namespace DbSchemas.WpfGui.Converters;

public class TimeSpanToDateTimeConverter : IValueConverter
{
    /// <summary>
    /// Convert the timespan to a datetime
    /// </summary>
    /// <param name="value"></param>
    /// <param name="targetType"></param>
    /// <param name="parameter"></param>
    /// <param name="culture"></param>
    /// <returns></returns>
    public object? Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value == null) return null;

        var timeSpan = (TimeSpan)value;

        var result = new DateTime(timeSpan.Ticks);

        return result;
    }

    /// <summary>
    /// Convert datetime to a timespan
    /// </summary>
    /// <param name="value"></param>
    /// <param name="targetType"></param>
    /// <param name="parameter"></param>
    /// <param name="culture"></param>
    /// <returns></returns>
    public object? ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (value is null) return null;

        var datetime = (DateTime)value;
        return datetime.TimeOfDay;
    }
}
