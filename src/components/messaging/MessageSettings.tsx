import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Users,
  Shield,
  Mail,
  CheckCircle,
  X,
  Search,
  Settings as SettingsIcon,
  ChevronRight,
  Save } from
'lucide-react';
import { Button } from '../ui/Button';
interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
}
const SETTINGS_SECTIONS: SettingsSection[] = [
{
  id: 'permissions',
  title: 'Permissions',
  description: 'Control who can send and receive messages',
  icon: Shield,
  color: 'bg-blue-500'
},
{
  id: 'receipts',
  title: 'Read Receipts',
  description: 'Configure read receipt settings',
  icon: Mail,
  color: 'bg-teal-500'
}];

const MOCK_CONTACTS = [
'Roman Andrei',
'Sarah Jenkins',
'Kennedy Kieth',
'Tech Support'];

const MOCK_TEAMS = ['Engineering', 'Product', 'Design', 'Marketing'];
const MOCK_ROLES = [
'Super Admin',
'Admin',
'Project Manager',
'Office Manager',
'Teammate',
'Salesperson',
'Freelancer'];

export function MessageSettings() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [designateStaff, setDesignateStaff] = useState(true);
  const [restrictCoordinator, setRestrictCoordinator] = useState(false);
  const [readReceipts, setReadReceipts] = useState(true);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([
  'Roman Andrei']
  );
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(true);
  const [soundNotifications, setSoundNotifications] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([
  'Super Admin',
  'Admin']
  );
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isTeamsOpen, setIsTeamsOpen] = useState(false);
  const [isRolesOpen, setIsRolesOpen] = useState(false);
  const handleToggleContact = (contact: string) => {
    setSelectedContacts((prev) =>
    prev.includes(contact) ?
    prev.filter((c) => c !== contact) :
    [...prev, contact]
    );
  };
  const handleToggleTeam = (team: string) => {
    setSelectedTeams((prev) =>
    prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    );
  };
  const handleToggleRole = (role: string) => {
    setSelectedRoles((prev) =>
    prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };
  const handleSelectAllContacts = () => {
    setSelectedContacts(MOCK_CONTACTS);
  };
  const handleSelectAllTeams = () => {
    setSelectedTeams(MOCK_TEAMS);
  };
  const handleSelectAllRoles = () => {
    setSelectedRoles(MOCK_ROLES);
  };
  // Search functionality
  const getSearchableContent = (sectionId: string): string => {
    const searchableText: {
      [key: string]: string;
    } = {
      permissions:
      'permissions control who can send receive messages prospect client coordinator designate staff contacts teams roles restrict messaging',
      receipts:
      'read receipts notify message read recipient roles super admin project manager'
    };
    return searchableText[sectionId] || '';
  };
  const filteredSections = SETTINGS_SECTIONS.filter((section) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const titleMatch = section.title.toLowerCase().includes(query);
    const descriptionMatch = section.description.toLowerCase().includes(query);
    const contentMatch = getSearchableContent(section.id).
    toLowerCase().
    includes(query);
    return titleMatch || descriptionMatch || contentMatch;
  });
  const renderPermissionsContent = () =>
  <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">
          Control Who Prospect(s)/Client(s) Can Message
        </h3>
        <p className="text-sm text-gray-600">
          By default, Prospect(s) & Client(s) are able to Message to any Admin,
          Project Manager, Office Manager or Salesperson. When you enable one of
          these settings, that default will be removed.
        </p>
      </div>

      <div className="space-y-4">
        {/* Restrict to Coordinator */}
        <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-900 block mb-1">
              Restrict messaging for Contacts to only their Coordinator
            </label>
            <p className="text-xs text-gray-500">
              If enabled, Contacts will be unable to send a message to anyone
              except their own Coordinator
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-4">
            <input
            type="checkbox"
            checked={restrictCoordinator}
            onChange={(e) => {
              setRestrictCoordinator(e.target.checked);
              if (e.target.checked) {
                setDesignateStaff(false);
              }
            }}
            className="sr-only peer" />

            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>

        {/* Designate Staff */}
        <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-900 block">
              Designate Staff to whom Contacts can Message
            </label>
          </div>
          <label className="relative inline-flex items-center cursor-pointer ml-4">
            <input
            type="checkbox"
            checked={designateStaff}
            onChange={(e) => {
              setDesignateStaff(e.target.checked);
              if (e.target.checked) {
                setRestrictCoordinator(false);
              }
            }}
            className="sr-only peer" />

            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>
      </div>

      {designateStaff &&
    <AnimatePresence mode="wait">
          <motion.div
        key="designate-staff"
        initial={{
          opacity: 0,
          height: 0
        }}
        animate={{
          opacity: 1,
          height: 'auto'
        }}
        exit={{
          opacity: 0,
          height: 0
        }}
        transition={{
          duration: 0.2,
          ease: 'easeInOut'
        }}
        className="overflow-hidden">

            <div className="space-y-6 pl-6 border-l-4 border-teal-500 pt-6">
              <p className="text-sm text-gray-600">
                These Contacts can only Message the users designated below
              </p>

              {/* Contacts */}
              <div>
                <label className="text-sm font-medium text-gray-900 block mb-3">
                  Contacts
                </label>
                <div className="flex gap-2 mb-3">
                  <button
                onClick={() => setIsContactsOpen(!isContactsOpen)}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors">

                    Select Individual
                  </button>
                  <button
                onClick={handleSelectAllContacts}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">

                    Select All
                  </button>
                </div>

                <div className="relative">
                  <div
                onClick={() => setIsContactsOpen(!isContactsOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white cursor-pointer min-h-[42px] flex flex-wrap gap-1 items-center">

                    {selectedContacts.length > 0 ?
                selectedContacts.map((contact) =>
                <span
                  key={contact}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  onClick={(e) => e.stopPropagation()}>

                          <X
                    className="h-3 w-3 cursor-pointer hover:text-gray-900"
                    onClick={() => handleToggleContact(contact)} />

                          {contact}
                        </span>
                ) :

                <span className="text-gray-400">Make a selection</span>
                }
                  </div>

                  {isContactsOpen &&
              <>
                      <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsContactsOpen(false)} />

                      <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {MOCK_CONTACTS.map((contact) =>
                  <label
                    key={contact}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">

                            <input
                      type="checkbox"
                      checked={selectedContacts.includes(contact)}
                      onChange={() => handleToggleContact(contact)}
                      className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />

                            <span className="text-sm text-gray-700">
                              {contact}
                            </span>
                          </label>
                  )}
                      </div>
                    </>
              }
                </div>
              </div>

              {/* Teams */}
              <div>
                <label className="text-sm font-medium text-gray-900 block mb-3">
                  Teams
                </label>
                <div className="flex gap-2 mb-3">
                  <button
                onClick={() => setIsTeamsOpen(!isTeamsOpen)}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors">

                    Select Individual
                  </button>
                  <button
                onClick={handleSelectAllTeams}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">

                    Select All
                  </button>
                </div>

                <div className="relative">
                  <div
                onClick={() => setIsTeamsOpen(!isTeamsOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white cursor-pointer min-h-[42px] flex flex-wrap gap-1 items-center">

                    {selectedTeams.length > 0 ?
                selectedTeams.map((team) =>
                <span
                  key={team}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  onClick={(e) => e.stopPropagation()}>

                          <X
                    className="h-3 w-3 cursor-pointer hover:text-gray-900"
                    onClick={() => handleToggleTeam(team)} />

                          {team}
                        </span>
                ) :

                <span className="text-gray-400">Make a selection</span>
                }
                  </div>

                  {isTeamsOpen &&
              <>
                      <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsTeamsOpen(false)} />

                      <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {MOCK_TEAMS.map((team) =>
                  <label
                    key={team}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">

                            <input
                      type="checkbox"
                      checked={selectedTeams.includes(team)}
                      onChange={() => handleToggleTeam(team)}
                      className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />

                            <span className="text-sm text-gray-700">
                              {team}
                            </span>
                          </label>
                  )}
                      </div>
                    </>
              }
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
    }
    </div>;

  const renderReceiptsContent = () =>
  <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-900 mb-2">
          Manage Read Receipts
        </h3>
      </div>

      <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-900 block">
            Be notified when your message is read by the recipient(s)
          </label>
        </div>
        <label className="relative inline-flex items-center cursor-pointer ml-4">
          <input
          type="checkbox"
          checked={readReceipts}
          onChange={(e) => setReadReceipts(e.target.checked)}
          className="sr-only peer" />

          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
        </label>
      </div>

      <AnimatePresence mode="wait">
        {readReceipts &&
      <motion.div
        key="read-receipts"
        initial={{
          opacity: 0,
          height: 0
        }}
        animate={{
          opacity: 1,
          height: 'auto'
        }}
        exit={{
          opacity: 0,
          height: 0
        }}
        transition={{
          duration: 0.2,
          ease: 'easeInOut'
        }}
        className="overflow-hidden">

            <div className="space-y-6 pl-6 border-l-4 border-teal-500 pt-6">
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Select which Roles will be able to ask for Read Receipts
                </h4>

                <p className="text-xs text-gray-600 mb-4">
                  Your choice here will be the default setting for all new
                  messages. You can choose to enable or disable on a per message
                  basis.
                </p>

                <label className="text-sm font-medium text-gray-900 block mb-3">
                  Roles
                </label>

                <div className="flex gap-2 mb-3">
                  <button
                onClick={() => setIsRolesOpen(!isRolesOpen)}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors">

                    Select Individual
                  </button>
                  <button
                onClick={handleSelectAllRoles}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">

                    Select All
                  </button>
                </div>

                <div className="relative">
                  <div
                onClick={() => setIsRolesOpen(!isRolesOpen)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white cursor-pointer min-h-[42px] flex flex-wrap gap-1 items-center">

                    {selectedRoles.length > 0 ?
                selectedRoles.map((role) =>
                <span
                  key={role}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  onClick={(e) => e.stopPropagation()}>

                          <X
                    className="h-3 w-3 cursor-pointer hover:text-gray-900"
                    onClick={() => handleToggleRole(role)} />

                          {role}
                        </span>
                ) :

                <span className="text-gray-400">Make a selection</span>
                }
                  </div>

                  {isRolesOpen &&
              <>
                      <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsRolesOpen(false)} />

                      <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {MOCK_ROLES.map((role) =>
                  <label
                    key={role}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer">

                            <input
                      type="checkbox"
                      checked={selectedRoles.includes(role)}
                      onChange={() => handleToggleRole(role)}
                      className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />

                            <span className="text-sm text-gray-700">
                              {role}
                            </span>
                          </label>
                  )}
                      </div>
                    </>
              }
                </div>
              </div>
            </div>
          </motion.div>
      }
      </AnimatePresence>
    </div>;

  const renderNotificationsContent = () =>
  <div className="space-y-4">
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
        <label className="text-sm font-medium text-gray-900">
          Email notifications for new messages
        </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
          type="checkbox"
          checked={emailNotifications}
          onChange={(e) => setEmailNotifications(e.target.checked)}
          className="sr-only peer" />

          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
        </label>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
        <label className="text-sm font-medium text-gray-900">
          Desktop notifications
        </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
          type="checkbox"
          checked={desktopNotifications}
          onChange={(e) => setDesktopNotifications(e.target.checked)}
          className="sr-only peer" />

          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
        </label>
      </div>

      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
        <label className="text-sm font-medium text-gray-900">
          Sound notifications
        </label>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
          type="checkbox"
          checked={soundNotifications}
          onChange={(e) => setSoundNotifications(e.target.checked)}
          className="sr-only peer" />

          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
        </label>
      </div>
    </div>;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5" />
            <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
          </div>

          <div className="flex items-center gap-2">
            {isSearchOpen ?
            <motion.div
              initial={{
                width: 0,
                opacity: 0
              }}
              animate={{
                width: 'auto',
                opacity: 1
              }}
              exit={{
                width: 0,
                opacity: 0
              }}
              transition={{
                duration: 0.2
              }}
              className="relative">

                <input
                type="text"
                placeholder="Open Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-64 pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />

              </motion.div> :
            null}
            <button
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) {
                  setSearchQuery('');
                }
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors">

              <Search className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-4">
          {filteredSections.length === 0 ?
          <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-sm">
                No settings found for "{searchQuery}"
              </p>
              <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-sm text-teal-600 hover:text-teal-700 font-medium">

                Clear search
              </button>
            </div> :

          filteredSections.map((section) => {
            const Icon = section.icon;
            const isExpanded = activeSection === section.id;
            return (
              <motion.div
                key={section.id}
                layout
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.3
                }}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden">

                  {/* Section Header - Always Visible */}
                  <button
                  onClick={() =>
                  setActiveSection(isExpanded ? null : section.id)
                  }
                  className="w-full p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left">

                    <div
                    className={`${section.color} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>

                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-gray-900 mb-1">
                        {section.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {section.description}
                      </p>
                    </div>
                    <motion.div
                    animate={{
                      rotate: isExpanded ? 90 : 0
                    }}
                    transition={{
                      duration: 0.2
                    }}>

                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded &&
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0
                    }}
                    animate={{
                      height: 'auto',
                      opacity: 1
                    }}
                    exit={{
                      height: 0,
                      opacity: 0
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut'
                    }}
                    className="border-t border-gray-200">

                        <div className="p-6">
                          {section.id === 'permissions' &&
                      renderPermissionsContent()}
                          {section.id === 'receipts' && renderReceiptsContent()}

                          {/* Action Buttons */}
                          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
                            <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Save
                            </button>
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors flex items-center gap-2">
                              <X className="h-4 w-4" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      </motion.div>
                  }
                  </AnimatePresence>
                </motion.div>);

          })
          }
        </div>
      </div>
    </div>);

}