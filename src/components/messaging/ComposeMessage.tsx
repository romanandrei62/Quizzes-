import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Paperclip,
  Smile,
  Image as ImageIcon,
  Send,
  MoreHorizontal,
  ChevronDown,
  Users,
  CheckCircle,
  MessageSquare,
  Search,
  Maximize2,
  Minimize2,
  FileText } from
'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ModalDialog } from '../ui/ModalDialog';
// Mock canned responses data
const CANNED_RESPONSES = [
{
  id: 1,
  title: 'Welcome Message',
  preview: "Hi! Welcome to our platform. We're excited to have you here...",
  content:
  "Hi! Welcome to our platform. We're excited to have you here. If you have any questions, feel free to reach out."
},
{
  id: 2,
  title: 'Follow-up',
  preview: 'Just checking in to see if you had any questions about...',
  content:
  'Just checking in to see if you had any questions about our previous conversation. Let me know how I can help!'
},
{
  id: 3,
  title: 'Meeting Confirmation',
  preview: 'Thanks for scheduling a meeting with us. Here are the details...',
  content:
  'Thanks for scheduling a meeting with us. Here are the details:\n\nDate: [Date]\nTime: [Time]\nLocation: [Location]\n\nLooking forward to speaking with you!'
},
{
  id: 4,
  title: 'Thank You',
  preview: 'Thank you for reaching out! We appreciate your interest...',
  content:
  'Thank you for reaching out! We appreciate your interest and will get back to you within 24 hours.'
}];

interface ComposeMessageProps {
  onCancel: () => void;
  onSend: () => void;
}
export function ComposeMessage({ onCancel, onSend }: ComposeMessageProps) {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [recipientInput, setRecipientInput] = useState('');
  const [showCc, setShowCc] = useState(false);
  const [ccRecipients, setCcRecipients] = useState<string[]>([]);
  const [ccInput, setCcInput] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [readReceipt, setReadReceipt] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [templateSearch, setTemplateSearch] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAttachArea, setShowAttachArea] = useState(false);
  const attachAreaRef = useRef<HTMLDivElement>(null);
  const templatesAreaRef = useRef<HTMLDivElement>(null);
  const filteredTemplates = CANNED_RESPONSES.filter(
    (template) =>
    template.title.toLowerCase().includes(templateSearch.toLowerCase()) ||
    template.preview.toLowerCase().includes(templateSearch.toLowerCase())
  );
  const insertTemplate = (template: (typeof CANNED_RESPONSES)[0]) => {
    setMessage(template.content);
    setShowTemplates(false);
    setTemplateSearch('');
  };
  const toggleAttachArea = () => {
    const newState = !showAttachArea;
    setShowAttachArea(newState);
    if (newState) {
      setShowTemplates(false);
      setTimeout(() => {
        attachAreaRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }, 350);
    }
  };
  const toggleTemplates = () => {
    const newState = !showTemplates;
    setShowTemplates(newState);
    if (newState) {
      setShowAttachArea(false);
      setTimeout(() => {
        templatesAreaRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }, 350);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent, isCc = false) => {
    const input = isCc ? ccInput : recipientInput;
    const setInput = isCc ? setCcInput : setRecipientInput;
    const list = isCc ? ccRecipients : recipients;
    const setList = isCc ? setCcRecipients : setRecipients;
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      setList([...list, input.trim()]);
      setInput('');
    } else if (e.key === 'Backspace' && !input && list.length > 0) {
      e.preventDefault();
      setList(list.slice(0, -1));
    }
  };
  const removeRecipient = (index: number, isCc = false) => {
    if (isCc) {
      setCcRecipients(ccRecipients.filter((_, i) => i !== index));
    } else {
      setRecipients(recipients.filter((_, i) => i !== index));
    }
  };
  return (
    <ModalDialog
      isOpen={true}
      onClose={onCancel}
      title="New Message"
      isExpanded={isExpanded}
      onToggleExpand={() => setIsExpanded(!isExpanded)}
      maxWidth="2xl"
      footer={
      <button
        onClick={onSend}
        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">

          <Send className="h-4 w-4" />
          Send
        </button>
      }>

      <div className={`p-6 ${isExpanded ? 'space-y-6' : 'space-y-3'}`}>
        {/* To Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              To <span className="text-red-500">*</span>
            </label>
            {!showCc &&
            <button
              onClick={() => setShowCc(true)}
              className="text-xs text-teal-600 hover:text-teal-700 font-medium transition-colors">

                + Add CC
              </button>
            }
          </div>
          <div className="flex flex-wrap gap-2 p-3 bg-white border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-all min-h-[48px]">
            {recipients.map((email, i) =>
            <motion.span
              layout
              initial={{
                scale: 0.8,
                opacity: 0
              }}
              animate={{
                scale: 1,
                opacity: 1
              }}
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-sm">

                {email}
                <button
                onClick={() => removeRecipient(i)}
                className="hover:text-gray-900">

                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            )}
            <input
              className="flex-1 min-w-[200px] outline-none text-sm"
              placeholder={recipients.length === 0 ? 'Select User(s)' : ''}
              value={recipientInput}
              onChange={(e) => setRecipientInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, false)} />

          </div>
        </div>

        {/* CC Field */}
        <AnimatePresence>
          {showCc &&
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
              duration: 0.2
            }}
            className="space-y-2 overflow-hidden group">

              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">CC</label>
                <button
                onClick={() => {
                  setShowCc(false);
                  setCcRecipients([]);
                  setCcInput('');
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-all"
                title="Remove CC">

                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 p-3 bg-white border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-all min-h-[48px]">
                {ccRecipients.map((email, i) =>
              <motion.span
                layout
                initial={{
                  scale: 0.8,
                  opacity: 0
                }}
                animate={{
                  scale: 1,
                  opacity: 1
                }}
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-sm">

                    {email}
                    <button
                  onClick={() => removeRecipient(i, true)}
                  className="hover:text-gray-900">

                      <X className="h-3 w-3" />
                    </button>
                  </motion.span>
              )}
                <input
                className="flex-1 min-w-[200px] outline-none text-sm"
                placeholder={
                ccRecipients.length === 0 ? 'Select User(s)' : ''
                }
                value={ccInput}
                onChange={(e) => setCcInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, true)} />

              </div>
            </motion.div>
          }
        </AnimatePresence>

        {/* Subject Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all text-sm"
            placeholder="Enter subject..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)} />

        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Message <span className="text-red-500">*</span>
          </label>
          <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-all">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center gap-1">
              <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded text-xs font-semibold transition-colors">
                B
              </button>
              <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded text-xs font-semibold italic transition-colors">
                I
              </button>
              <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded text-xs font-semibold underline transition-colors">
                U
              </button>
              <div className="w-px h-4 bg-gray-300 mx-1" />
              <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors">
                <ImageIcon className="h-4 w-4" />
              </button>
              <button className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors">
                <Smile className="h-4 w-4" />
              </button>
            </div>
            <textarea
              className={`w-full p-4 outline-none resize-none text-sm text-gray-800 leading-relaxed ${isExpanded ? 'min-h-[400px]' : 'min-h-[100px]'}`}
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)} />

          </div>
        </div>

        {/* Attach Files & Canned Responses - Expandable Sections */}
        <div className="space-y-3">
          {/* Buttons Row */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleAttachArea}
              className={`p-2 rounded-lg transition-all duration-200 ease-out ${showAttachArea ? 'bg-teal-600 text-white shadow-md' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 active:scale-95'}`}
              title="Attach Files">

              <Paperclip className="h-5 w-5" />
            </button>

            <button
              onClick={toggleTemplates}
              className={`p-2 rounded-lg transition-all duration-200 ease-out ${showTemplates ? 'bg-teal-600 text-white shadow-md' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 active:scale-95'}`}
              title="Canned Responses">

              <MessageSquare className="h-5 w-5" />
            </button>
          </div>

          {/* Attach Files Expandable Area */}
          <AnimatePresence>
            {showAttachArea &&
            <motion.div
              ref={attachAreaRef}
              initial={{
                height: 0,
                opacity: 0,
                y: -10
              }}
              animate={{
                height: 'auto',
                opacity: 1,
                y: 0
              }}
              exit={{
                height: 0,
                opacity: 0,
                y: -10
              }}
              transition={{
                duration: 0.35,
                ease: [0.32, 0.72, 0, 1]
              }}
              className="overflow-hidden">

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                  <Paperclip className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drop or Select Files</p>
                </div>
              </motion.div>
            }
          </AnimatePresence>

          {/* Canned Responses Expandable Area */}
          <AnimatePresence>
            {showTemplates &&
            <motion.div
              ref={templatesAreaRef}
              initial={{
                height: 0,
                opacity: 0,
                y: -10
              }}
              animate={{
                height: 'auto',
                opacity: 1,
                y: 0
              }}
              exit={{
                height: 0,
                opacity: 0,
                y: -10
              }}
              transition={{
                duration: 0.35,
                ease: [0.32, 0.72, 0, 1]
              }}
              className="overflow-hidden">

                <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                  {/* Search */}
                  <div className="p-3 border-b border-gray-200 bg-gray-50">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                      type="text"
                      placeholder="Search canned responses..."
                      value={templateSearch}
                      onChange={(e) => setTemplateSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white" />

                    </div>
                  </div>

                  {/* Templates List */}
                  <div className="max-h-60 overflow-y-auto">
                    {filteredTemplates.length > 0 ?
                  filteredTemplates.map((template, index) =>
                  <button
                    key={template.id}
                    onClick={() => insertTemplate(template)}
                    className="w-full px-4 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-start gap-3">

                          {/* Left Border Accent */}
                          <div
                      className="w-1 h-12 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: [
                        '#8B5CF6',
                        '#EC4899',
                        '#10B981',
                        '#F59E0B'][
                        index % 4]
                      }} />


                          <div className="flex-1 min-w-0">
                            <h3 className="text-[15px] font-medium text-gray-900 mb-1">
                              {template.title}
                            </h3>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {template.preview}
                            </p>
                          </div>
                        </button>
                  ) :

                  <div className="px-4 py-8 text-center">
                        <p className="text-sm text-gray-500">
                          No templates found
                        </p>
                        <a
                      href="#"
                      className="text-xs text-teal-600 hover:text-teal-700 font-medium mt-2 inline-block">

                          Create a new template
                        </a>
                      </div>
                  }
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>

        {/* Read Receipt Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <span className="text-sm text-gray-700">
            Be notified when your message is read by the recipient(s)
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={readReceipt}
              onChange={(e) => setReadReceipt(e.target.checked)}
              className="sr-only peer" />

            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
          </label>
        </div>
      </div>
    </ModalDialog>);

}