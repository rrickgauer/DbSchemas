﻿
using System.Windows.Controls;

namespace DbSchemas.WpfGui.Views.Pages.EditConnection;

/// <summary>
/// Interaction logic for EditConnectionPage.xaml
/// </summary>
public partial class EditConnectionPage : INavigableView<EditConnectionPageViewModel>
{
    public EditConnectionPageViewModel ViewModel { get; set; }

    public EditConnectionPage(EditConnectionPageViewModel viewModel)
    {
        ViewModel = viewModel;
        DataContext = this;

        InitializeComponent();
        //this.pwrdBox.TextChanged += PwrdBox_TextChanged;
    }

    private void PwrdBox_TextChanged(object sender, TextChangedEventArgs e)
    {
        var ss = pwrdBox;
    }
}
