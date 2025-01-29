using DbSchemas.ServiceHub.Configurations;
using DbSchemas.ServiceHub.Repository;
using DbSchemas.ServiceHub.Services;
using DbSchemas.WpfGui.Models;
using DbSchemas.WpfGui.Services;
using DbSchemas.WpfGui.Views.Pages.Connections;
using DbSchemas.WpfGui.Views.Pages.EditConnection;
using DbSchemas.WpfGui.Views.Pages.Home;
using DbSchemas.WpfGui.Views.Pages.Settings;
using DbSchemas.WpfGui.Views.Pages.ViewTables;
using DbSchemas.WpfGui.Views.Windows;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.IO;
using System.Reflection;
using System.Windows;
using System.Windows.Threading;



namespace DbSchemas.WpfGui
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App
    {
        // The.NET Generic Host provides dependency injection, configuration, logging, and other services.
        // https://docs.microsoft.com/dotnet/core/extensions/generic-host
        // https://docs.microsoft.com/dotnet/core/extensions/dependency-injection
        // https://docs.microsoft.com/dotnet/core/extensions/configuration
        // https://docs.microsoft.com/dotnet/core/extensions/logging
        private static readonly IHost _host = Host
            .CreateDefaultBuilder()
            .ConfigureAppConfiguration(c => 
            {
                var directoryName = Path.GetDirectoryName(Assembly.GetEntryAssembly()!.Location);
                c.SetBasePath(directoryName!);
            })
            .ConfigureServices((context, services) =>
            {
                #region - WpfUi -
                
                services.AddHostedService<ApplicationHostService>();
                services.AddSingleton<ISnackbarService, SnackbarService>();
                services.AddSingleton<IPageService, PageService>();
                services.AddSingleton<IThemeService, ThemeService>();
                services.AddSingleton<ITaskBarService, TaskBarService>();
                services.AddSingleton<INavigationService, NavigationService>();
                services.AddSingleton<IContentDialogService, ContentDialogService>();

                // Main window container with navigation
                services.AddScoped<INavigationWindow, Container>();
                services.AddScoped<ContainerViewModel>();
                #endregion

                #region Views and ViewModels

                services.AddScoped<SettingsPage>();
                services.AddScoped<SettingsViewModel>();

                services.AddScoped<HomePage>();
                services.AddScoped<HomePageViewModel>();

                services.AddScoped<ConnectionsPage>();
                services.AddScoped<ConnectionsPageViewModel>();

                services.AddScoped<EditConnectionPage>();
                services.AddScoped<EditConnectionPageViewModel>();

                services.AddScoped<ViewTablesPage>();
                services.AddScoped<ViewTablesPageViewModel>();


                #endregion

                #region Services

                services.AddScoped<IConfigs, ConfigurationDev>();
                services.AddScoped<ProgramDataService>();
                services.AddScoped<DatabaseConnectionRecordService>();
                services.AddScoped<DumpService>();
                services.AddScoped<CliService>();
                services.AddScoped<DatabaseConnectionRecordRepository>();

                #endregion


                // Configuration
                services.Configure<AppConfig>(context.Configuration.GetSection(nameof(AppConfig)));
            }).Build();

        /// <summary>
        /// Gets registered service.
        /// </summary>
        /// <typeparam name="T">Type of the service to get.</typeparam>
        /// <returns>Instance of the service or <see langword="null"/>.</returns>
        public static T GetService<T>() where T : class
        {
            return _host.Services.GetRequiredService<T>();
            //return _host.Services.GetService(typeof(T)) as T;
        }

        /// <summary>
        /// Occurs when the application is loading.
        /// </summary>
        private async void OnStartup(object sender, StartupEventArgs e)
        {
            await _host.StartAsync();
        }

        /// <summary>
        /// Occurs when the application is closing.
        /// </summary>
        private async void OnExit(object sender, ExitEventArgs e)
        {
            await _host.StopAsync();

            _host.Dispose();
        }

        /// <summary>
        /// Occurs when an exception is thrown by an application but not handled.
        /// </summary>
        private void OnDispatcherUnhandledException(object sender, DispatcherUnhandledExceptionEventArgs e)
        {
            // For more info see https://docs.microsoft.com/en-us/dotnet/api/system.windows.application.dispatcherunhandledexception?view=windowsdesktop-6.0
        }
    }
}