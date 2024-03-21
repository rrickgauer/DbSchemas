using DbSchemas.WpfGui.Helpers;
using System;
using System.Globalization;
using System.Windows.Data;
using System.Windows.Media;

namespace DbSchemas.WpfGui.Converters;

/// <summary>
/// Convert a color to string and vice versa
/// </summary>
public class ColorConverterMore : IValueConverter
{
    /// <summary>
    /// Convert a string to a managed Color object
    /// </summary>
    /// <param name="value"></param>
    /// <param name="targetType"></param>
    /// <param name="parameter"></param>
    /// <param name="culture"></param>
    /// <returns></returns>
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        var stringValue = value as string;
        var result = ColorConverter.ConvertFromString(stringValue) as Color?;
        return result!;
    }

    /// <summary>
    /// Convert a managed Color object to its hex string representation
    /// </summary>
    /// <param name="value"></param>
    /// <param name="targetType"></param>
    /// <param name="parameter"></param>
    /// <param name="culture"></param>
    /// <returns></returns>
    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        var color = (Color)value;
        var result = color.ToHexString();
        return result;
    }
}
