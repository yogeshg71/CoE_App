{
	"_Name": "CoE_Dashboard",
	"Version": "/CoE_Dashboard/Globals/AppDefinition_Version.global",
	"MainPage": "/CoE_Dashboard/Pages/Main.page",
	"OnLaunch": [
		"/CoE_Dashboard/Actions/Service/InitializeOnline.action"
	],
	"OnWillUpdate": "/CoE_Dashboard/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/CoE_Dashboard/Actions/Service/InitializeOnline.action",
	"Styles": "/CoE_Dashboard/Styles/Styles.less",
	"Localization": "/CoE_Dashboard/i18n/i18n.properties",
	"_SchemaVersion": "23.8"
}