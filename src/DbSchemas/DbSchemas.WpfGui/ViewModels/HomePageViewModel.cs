using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;
using Wpf.Ui.Extensions;


namespace DbSchemas.WpfGui.ViewModels;

public partial class HomePageViewModel : ObservableObject, INavigationAware
{
    private readonly IContentDialogService _contentDialogService;

    public HomePageViewModel(IContentDialogService contentDialogService)
    {
        _contentDialogService = contentDialogService;
    }




    [RelayCommand]
    private async Task OpenDialog(object content)
    {
        ContentDialogResult result = await _contentDialogService.ShowSimpleDialogAsync(new SimpleContentDialogCreateOptions()
        {
            Title = "Save your work?",
            Content = content,
            PrimaryButtonText = "Save",
            SecondaryButtonText = "Don't Save",
            CloseButtonText = "Cancel",
            
        });


        var parentElement = _contentDialogService.GetContentPresenter();

        MessageBox.Show($"{result}");
    }




    #region - INavigationAware -

    public void OnNavigatedFrom()
    {
        //throw new NotImplementedException();
    }

    public void OnNavigatedTo()
    {
        //throw new NotImplementedException();
    }

    #endregion
}
