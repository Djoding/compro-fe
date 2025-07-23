"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Save, Shield, Bell, Globe, Palette } from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Teknalogi",
    siteDescription: "Accelerating Your Business Through Digital Innovation",
    contactEmail: "info@teknalogi.com",

    // Security Settings
    enableTwoFactor: false,
    sessionTimeout: "30",
    maxLoginAttempts: "3",

    // Email Settings
    emailNotifications: true,
    weeklyReports: false,
    marketingEmails: true,

    // Appearance Settings
    theme: "light",
    language: "en",
    timezone: "UTC+7"
  });

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = (section: string) => {
    // Simulate saving
    alert(`${section} settings saved successfully!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure your admin panel settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <CardTitle>General Settings</CardTitle>
            </div>
            <CardDescription>Basic site configuration and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="siteName" className="text-sm font-medium">
                Site Name
              </label>
              <Input id="siteName" value={settings.siteName} onChange={e => handleSettingChange("siteName", e.target.value)} />
            </div>
            <div className="space-y-2">
              <label htmlFor="siteDescription" className="text-sm font-medium">
                Site Description
              </label>
              <textarea
                id="siteDescription"
                rows={3}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-none"
                value={settings.siteDescription}
                onChange={e => handleSettingChange("siteDescription", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contactEmail" className="text-sm font-medium">
                Contact Email
              </label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={e => handleSettingChange("contactEmail", e.target.value)}
              />
            </div>
            <Button onClick={() => handleSave("General")} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save General Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <CardTitle>Security Settings</CardTitle>
            </div>
            <CardDescription>Security and authentication configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Two-Factor Authentication</label>
                <p className="text-xs text-gray-500">Add an extra layer of security</p>
              </div>
              <button
                onClick={() => handleSettingChange("enableTwoFactor", !settings.enableTwoFactor)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableTwoFactor ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableTwoFactor ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="space-y-2">
              <label htmlFor="sessionTimeout" className="text-sm font-medium">
                Session Timeout (minutes)
              </label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={e => handleSettingChange("sessionTimeout", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="maxLoginAttempts" className="text-sm font-medium">
                Max Login Attempts
              </label>
              <Input
                id="maxLoginAttempts"
                type="number"
                value={settings.maxLoginAttempts}
                onChange={e => handleSettingChange("maxLoginAttempts", e.target.value)}
              />
            </div>

            <Button onClick={() => handleSave("Security")} className="w-full">
              <Shield className="h-4 w-4 mr-2" />
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-yellow-600" />
              <CardTitle>Notification Settings</CardTitle>
            </div>
            <CardDescription>Configure email and notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Email Notifications</label>
                <p className="text-xs text-gray-500">Receive important notifications via email</p>
              </div>
              <button
                onClick={() => handleSettingChange("emailNotifications", !settings.emailNotifications)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.emailNotifications ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.emailNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Weekly Reports</label>
                <p className="text-xs text-gray-500">Get weekly analytics reports</p>
              </div>
              <button
                onClick={() => handleSettingChange("weeklyReports", !settings.weeklyReports)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.weeklyReports ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.weeklyReports ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Marketing Emails</label>
                <p className="text-xs text-gray-500">Receive marketing and promotional emails</p>
              </div>
              <button
                onClick={() => handleSettingChange("marketingEmails", !settings.marketingEmails)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.marketingEmails ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.marketingEmails ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <Button onClick={() => handleSave("Notification")} className="w-full">
              <Bell className="h-4 w-4 mr-2" />
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Palette className="h-5 w-5 text-purple-600" />
              <CardTitle>Appearance Settings</CardTitle>
            </div>
            <CardDescription>Customize the look and feel of your admin panel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="theme" className="text-sm font-medium">
                Theme
              </label>
              <select
                id="theme"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={settings.theme}
                onChange={e => handleSettingChange("theme", e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="language" className="text-sm font-medium">
                Language
              </label>
              <select
                id="language"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={settings.language}
                onChange={e => handleSettingChange("language", e.target.value)}
              >
                <option value="en">English</option>
                <option value="id">Bahasa Indonesia</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="timezone" className="text-sm font-medium">
                Timezone
              </label>
              <select
                id="timezone"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={settings.timezone}
                onChange={e => handleSettingChange("timezone", e.target.value)}
              >
                <option value="UTC+7">UTC+7 (Jakarta)</option>
                <option value="UTC+0">UTC+0 (London)</option>
                <option value="UTC-5">UTC-5 (New York)</option>
                <option value="UTC+9">UTC+9 (Tokyo)</option>
              </select>
            </div>

            <Button onClick={() => handleSave("Appearance")} className="w-full">
              <Palette className="h-4 w-4 mr-2" />
              Save Appearance Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
          <CardDescription>Current system status and information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">v1.0.0</div>
              <div className="text-sm text-gray-500">Version</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-gray-500">Uptime</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">1.2GB</div>
              <div className="text-sm text-gray-500">Storage Used</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
