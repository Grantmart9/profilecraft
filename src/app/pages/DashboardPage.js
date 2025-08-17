"use client"
import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from "next/image";
import * as motion from "motion/react-client"
import avatar from "../images/avatar.jpg";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import LoginIcon from '@mui/icons-material/Login';

const DashboardPage = ({ handlePage, scrollToTop }) => {

  const [DashPage, setDashPage] = useState("none")

  const AccountDetails = {
    "name": "Olivia Carter",
    "membership_start_date": "2024",
    "personal_information": {
      "email": "olivia.carter@gmail.com",
      "phone": "+27 74 289 3721"
    },
    "donation_history": {
      "total_donations": 12,
      "recent_activity": 24
    }
  }

  const handleDashPage = (selected) => { setDashPage(selected) }

  const DetailsPage = () => {
    const [edit, setEdit] = useState("ProfileView")

    const handleProfile = () => { setEdit("ProfileEdit") }

    const ProfileEdit = () => {
      return (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col items-center mb-8">
                <Image src={avatar} alt="Profile" className="mx-auto rounded-full w-32 h-32 mb-6" />
                <h2 className="text-2xl font-bold text-gray-800">{AccountDetails.name}</h2>
                <p className="text-gray-600">Member since {AccountDetails.membership_start_date}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue={AccountDetails.name}
                    className="mb-4"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue={AccountDetails.personal_information.email}
                    className="mb-4"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    defaultValue={AccountDetails.personal_information.phone}
                    className="mb-4"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Location</label>
                  <TextField
                    fullWidth
                    variant="outlined"
                    className="mb-4"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  variant="contained"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )
    }

    const ProfileView = () => {
      return (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col items-center mb-8">
                <Image src={avatar} alt="Profile" className="mx-auto rounded-full w-32 h-32 mb-6" />
                <h2 className="text-2xl font-bold text-gray-800">{AccountDetails.name}</h2>
                <p className="text-gray-600">Member since {AccountDetails.membership_start_date}</p>
                <Button
                  onClick={() => handleProfile()}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
                >
                  Edit Profile
                </Button>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-medium">{AccountDetails.personal_information.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Phone</p>
                    <p className="font-medium">{AccountDetails.personal_information.phone}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Donation History</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Total Donations</p>
                    <p className="font-medium">{AccountDetails.donation_history.total_donations} items donated</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Recent Activity</p>
                    <p className="font-medium">{AccountDetails.donation_history.recent_activity} hours ago</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
                >
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )
    }

    return (
      <>
        {edit === "ProfileView" ?
          <><ProfileView /></> :
          <><ProfileEdit /></>}
      </>
    )
  }

  const PasswordPage = () => {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Change Password</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Current Password</label>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  className="mb-4"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  className="mb-4"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  className="mb-4"
                />
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button
                variant="contained"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
              >
                Update Password
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const Dashboard = () => {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Your Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Total Donations</h3>
              <p className="text-3xl font-bold text-blue-600">12 items</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">People Helped</h3>
              <p className="text-3xl font-bold text-green-600">500+</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Community Rank</h3>
              <p className="text-3xl font-bold text-purple-600">#12</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="text-blue-600 text-2xl mr-4">👕</div>
                <div>
                  <p className="font-medium">Clothing Donation</p>
                  <p className="text-gray-600 text-sm">2 days ago</p>
                </div>
                <div className="ml-auto text-green-600 font-medium">+50 pts</div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="text-blue-600 text-2xl mr-4">📚</div>
                <div>
                  <p className="font-medium">Book Drive Participation</p>
                  <p className="text-gray-600 text-sm">1 week ago</p>
                </div>
                <div className="ml-auto text-green-600 font-medium">+30 pts</div>
              </div>
              <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className="text-blue-600 text-2xl mr-4"> volunte</div>
                <div>
                  <p className="font-medium">Volunteered at Shelter</p>
                  <p className="text-gray-600 text-sm">2 weeks ago</p>
                </div>
                <div className="ml-auto text-green-600 font-medium">+100 pts</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const NotificationsPage = () => {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Notification Settings</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-gray-600 text-sm">Receive email updates</p>
                </div>
                <div className="w-12 h-6 bg-blue-600 rounded-full p-1">
                  <div className="bg-white w-4 h-4 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-gray-600 text-sm">Receive push notifications</p>
                </div>
                <div className="w-12 h-6 bg-gray-300 rounded-full p-1">
                  <div className="bg-white w-4 h-4 rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-gray-600 text-sm">Receive text messages</p>
                </div>
                <div className="w-12 h-6 bg-gray-300 rounded-full p-1">
                  <div className="bg-white w-4 h-4 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const PreferencesPage = () => {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">App Preferences</h2>
            <div className="space-y-6">
              <div>
                <p className="font-medium mb-2">Theme</p>
                <div className="grid grid-cols-3 gap-4">
                  <button className="p-4 border-2 border-blue-600 rounded-lg bg-blue-50">
                    <p>Light</p>
                  </button>
                  <button className="p-4 border-2 border-gray-300 rounded-lg">
                    <p>Dark</p>
                  </button>
                  <button className="p-4 border-2 border-gray-300 rounded-lg">
                    <p>System</p>
                  </button>
                </div>
              </div>
              <div>
                <p className="font-medium mb-2">Language</p>
                <select className="w-full p-3 border border-gray-300 rounded-lg">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const TermsPage = () => {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Terms of Service</h2>
            <div className="prose max-w-none">
              <h3>1. Introduction</h3>
              <p>These terms and conditions outline the rules and regulations for the use of our service.</p>

              <h3>2. Intellectual Property</h3>
              <p>Unless otherwise stated, we own the intellectual property rights for all content on this platform.</p>

              <h3>3. Restrictions</h3>
              <p>You are specifically restricted from:</p>
              <ul>
                <li>Publishing any material that is unlawful or fraudulent</li>
                <li>Using our platform in any way that causes or may cause damage</li>
                <li>Using our platform in any way that impacts user access</li>
              </ul>

              <h3>4. Limitation of Liability</h3>
              <p>We shall not be liable for any consequential, incidental, indirect, or special damages.</p>

              <h3>5. Changes to These Terms</h3>
              <p>We reserve the right to modify these terms at any time.</p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const PolicyPage = () => {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Privacy Policy</h2>
            <div className="prose max-w-none">
              <h3>1. Information We Collect</h3>
              <p>We collect information you provide directly to us, such as when you create an account or donate.</p>

              <h3>2. How We Use Information</h3>
              <p>We use the information we collect to provide, maintain, and improve our services.</p>

              <h3>3. Information Sharing and Disclosure</h3>
              <p>We do not share personal information with companies, organizations, or individuals outside of our organization except in the following cases:</p>
              <ul>
                <li>With your consent</li>
                <li>For legal reasons</li>
                <li>To protect rights and property</li>
              </ul>

              <h3>4. Data Security</h3>
              <p>We work hard to protect your personal information. We implement security measures to protect against unauthorized access.</p>

              <h3>5. Your Rights</h3>
              <p>You have the right to access, update, or delete your personal information at any time.</p>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  const ProfileSettings = [
    {
      name: "Account",
      buttons: [
        { icon: <PersonIcon fontSize="large" />, name: "Account Details", description: "Manage your personal information", page: "Details" },
        { icon: <LockIcon fontSize="large" />, name: "Password", description: "Change your password", page: "Password" },
        { icon: <DashboardIcon fontSize="large" />, name: "Dashboard", description: "Keep track of your donations", page: "Dashboard" }
      ]
    },
    {
      name: "Notifications",
      buttons: [
        { icon: <NotificationsIcon fontSize="large" />, name: "Notification Settings", description: "Customize your notification preferences", page: "Notifications" }
      ],
      hasToggle: true
    },
    {
      name: "App Settings",
      buttons: [
        { icon: <SettingsIcon fontSize="large" />, name: "App Preferences", description: "Manage your app preferences", page: "Preferences" }
      ]
    },
    {
      name: "Legal",
      buttons: [
        { icon: <DescriptionIcon fontSize="large" />, name: "Terms of Service", description: "View our terms of service", page: "Terms" },
        { icon: <PrivacyTipIcon fontSize="large" />, name: "Privacy Policy", description: "Read our privacy policy", page: "Policy" }
      ]
    }
  ];

  useEffect(() => {
    if (scrollToTop) {
      scrollToTop();
    }
  }, [DashPage, scrollToTop]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-8">
      {DashPage === "none" ?
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-700 py-12 text-center"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
            <p className="text-white text-xl">Manage your account settings and preferences</p>
          </div>
        </motion.div> :
        <div className="inline-flex">
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 3 }}
            transition={{
              delay: 0.2,
              type: "tween",
              stiffness: 200,
              damping: 40,
              mass: 8,
              duration: 0.5,
            }}>
            <div className="flex-inline text-lg text-gray-800 text-left ml-2 font-bold mt-4">
              <Button onClick={() => setDashPage("none")} disableRipple={true}><ArrowBackIcon sx={{ color: "gray.800" }} /></Button> My Profile | {DashPage}
            </div>
          </motion.div>
        </div>}
      {DashPage === "none" ?
        <div className="max-w-4xl mx-auto px-4 py-8">
          {ProfileSettings.map((section, i) => (
            <motion.div
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              transition={{
                delay: 0.2 * i,
                type: "spring",
                stiffness: 200,
                damping: 40,
                mass: 20,
                duration: 1,
              }}
              key={i}
              className="mb-8 bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-black text-2xl font-bold mb-4">{section.name}</h3>
              <div className="flex flex-col gap-2">
                {section.buttons.map((item, j) => (
                  <motion.div
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 1, x: 3 }}
                    transition={{
                      delay: 0.4 * j,
                      type: "spring",
                      stiffness: 200,
                      damping: 40,
                      mass: 8,
                      duration: 0.5,
                    }} key={j}>
                    <Button
                      key={j}
                      disableRipple={true}
                      onClick={() => handleDashPage(item.page)}
                      startIcon={item.icon}
                      className="justify-start text-left w-full py-4"
                      sx={{
                        textTransform: "none",
                        color: "gray.800",
                        '&:hover': {
                          backgroundColor: "gray.50",
                        }
                      }}
                    >
                      <div className="flex flex-col items-start w-full text-left">
                        <span className="font-medium text-lg">{item.name}</span>
                        <span className="text-gray-500 text-sm">{item.description}</span>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          ))}
        </div> : null}
      {DashPage === "Details" ? <><DetailsPage /></> : null}
      {DashPage === "Password" ? <><PasswordPage /></> : null}
      {DashPage === "Dashboard" ? <><Dashboard /></> : null}
      {DashPage === "Notifications" ? <><NotificationsPage /></> : null}
      {DashPage === "Preferences" ? <><PreferencesPage /></> : null}
      {DashPage === "Terms" ? <><TermsPage /></> : null}
      {DashPage === "Policy" ? <><PolicyPage /></> : null}
    </div>
  )
}

export default DashboardPage;