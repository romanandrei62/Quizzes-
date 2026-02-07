import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Reply, ReplyAll, Trash2, ArrowLeft, MoreHorizontal, Printer, Star, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
interface MessageThreadProps {
  onBack: () => void;
}
export function MessageThread({
  onBack
}: MessageThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);
  return <motion.div initial={{
    opacity: 0,
    x: 20
  }} animate={{
    opacity: 1,
    x: 0
  }} exit={{
    opacity: 0,
    x: 20
  }} className="flex flex-col h-full bg-white">

      {/* Thread Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-gray-100 rounded-full">

            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Urgent: Project Requirements Update
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-xs font-medium">
                Inbox
              </span>
              <span>•</span>
              <span>Today, 10:42 AM</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Star className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 bg-gray-50/50">

        {/* Previous Message */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="flex gap-4 max-w-4xl mx-auto opacity-75">

          <Avatar fallback="RA" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-semibold text-gray-900">Roman Andrei</span>
              <span className="text-xs text-gray-400">Yesterday, 4:20 PM</span>
            </div>
            <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-gray-700 leading-relaxed">
              <p>Hi Kennedy,</p>
              <p className="mt-2">
                Could you please send over the updated requirements document? We
                need to review the scope changes before the sprint planning
                tomorrow.
              </p>
              <p className="mt-2">
                Thanks,
                <br />
                Roman
              </p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink-0 mx-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
            Today
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Latest Message */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.1
      }} className="flex gap-4 max-w-4xl mx-auto">

          <Avatar fallback="MK" status="online" className="mt-1" />
          <div className="flex-1">
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-semibold text-gray-900">
                Mr. M. Kennedy Kieth
              </span>
              <span className="text-xs text-gray-400">10:42 AM</span>
            </div>
            <div className="bg-white p-6 rounded-2xl rounded-tl-none shadow-md border border-teal-100/50 text-gray-800 leading-relaxed relative group">
              <p>Hi Roman,</p>
              <p className="mt-3">
                I've attached the updated requirements document as requested.
                The main changes are in Section 3 regarding the user
                authentication flow.
              </p>
              <p className="mt-3">
                We also need to adjust the timeline by about 2 weeks to
                accommodate these changes. Let me know if this works for your
                team.
              </p>

              {/* Attachment Card */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-3 w-fit hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="h-10 w-10 bg-red-100 rounded flex items-center justify-center text-red-600 font-bold text-xs">
                  PDF
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Requirements_v2.pdf
                  </p>
                  <p className="text-xs text-gray-500">2.4 MB</p>
                </div>
              </div>

              <p className="mt-4">
                Best regards,
                <br />
                Kennedy
              </p>

              {/* Hover Actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm rounded-lg border border-gray-100 p-1 flex">
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500">
                  <Reply className="h-4 w-4" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-500">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Reply Action Bar */}
      <div className="p-6 border-t border-gray-200 bg-white z-10">
        <div className="max-w-4xl mx-auto flex gap-3">
          <Button variant="primary" leftIcon={<Reply className="h-4 w-4" />}>
            Reply
          </Button>
          <Button variant="secondary" leftIcon={<ReplyAll className="h-4 w-4" />}>

            Reply All
          </Button>
          <div className="flex-1"></div>
          <Button variant="danger" leftIcon={<Trash2 className="h-4 w-4" />}>
            Delete
          </Button>
        </div>
      </div>
    </motion.div>;
}