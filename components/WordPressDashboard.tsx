import React, { useState } from 'react';
import { useLanguage, Page } from '../types';

interface WordPressDashboardProps {
  setPage: (page: Page) => void;
}

const WordPressDashboard: React.FC<WordPressDashboardProps> = ({ setPage }) => {
  const { t, language } = useLanguage();
  const [activeMenu, setActiveMenu] = useState('posts');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'posts', label: 'Posts', icon: 'M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414 4 4 0 00-5.656 0z' },
    { id: 'media', label: 'Media', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'pages', label: 'Pages', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { id: 'comments', label: 'Comments', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { id: 'appearance', label: 'Appearance', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
    { id: 'plugins', label: 'Plugins', icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z' },
    { id: 'users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'tools', label: 'Tools', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    { id: 'settings', label: 'Settings', icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' },
  ];

  // Mock Data for "Posts"
  const posts = [
      { id: 1, title: 'Hello World!', author: 'Admin', categories: 'Uncategorized', tags: '', date: '2024/05/12', status: 'Published' },
      { id: 2, title: 'Sample Post 1', author: 'Editor', categories: 'News', tags: 'waste, eco', date: '2024/05/10', status: 'Published' },
      { id: 3, title: 'Sample Post 2', author: 'Editor', categories: 'Updates', tags: 'recycling', date: '2024/05/09', status: 'Published' },
      { id: 4, title: 'Sample Post 3', author: 'Editor', categories: 'News', tags: '', date: '2024/05/08', status: 'Published' },
      { id: 5, title: 'Sample Post 4', author: 'Editor', categories: 'Tips', tags: 'zero-waste', date: '2024/05/07', status: 'Published' },
      { id: 6, title: 'Sample Post 5', author: 'Editor', categories: 'Events', tags: '', date: '2024/05/06', status: 'Published' },
      { id: 7, title: 'Why Recycling Matters', author: 'Admin', categories: 'Education', tags: 'green', date: '2024/05/05', status: 'Draft' },
      { id: 8, title: 'New Truck Fleet', author: 'Admin', categories: 'Company', tags: 'logistics', date: '2024/05/04', status: 'Published' },
      { id: 9, title: 'Community Cleanup', author: 'Editor', categories: 'Events', tags: 'community', date: '2024/05/03', status: 'Published' },
      { id: 10, title: 'Holiday Schedule', author: 'Admin', categories: 'News', tags: 'schedule', date: '2024/05/02', status: 'Published' },
      { id: 11, title: 'Composting 101', author: 'Editor', categories: 'Guides', tags: 'compost', date: '2024/05/01', status: 'Published' },
      { id: 12, title: 'Privacy Policy Update', author: 'Admin', categories: 'Legal', tags: '', date: '2024/04/30', status: 'Published' },
  ];

  const handleBackToApp = () => {
      setPage('home');
  }

  return (
    <div className="flex flex-col h-screen font-sans text-[13px] bg-[#f1f1f1]">
      {/* Admin Bar */}
      <div className="h-[32px] bg-[#1d2327] flex items-center justify-between text-[#f0f0f1] px-3 fixed top-0 w-full z-50">
        <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1 hover:text-[#72aee6] cursor-pointer">
               <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 0a10 10 0 1010 10A10.01 10.01 0 0010 0zM1 10a9 9 0 011.66-5.32l9.67 12.63A9 9 0 011 10zm11.37 5.7L3.67 3.03A9 9 0 0119 10a8.95 8.95 0 01-6.63 5.7zM17.42 5.09L10 14.71l-1.63-2.11L14.71 5a9.08 9.08 0 012.71.09z" /></svg>
            </span>
            <span className="flex items-center gap-1 hover:text-[#72aee6] cursor-pointer font-semibold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                My Site
            </span>
            <span className="flex items-center gap-1 hover:text-[#72aee6] cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                0
            </span>
             <span className="flex items-center gap-1 hover:text-[#72aee6] cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                New
            </span>
        </div>
        <div className="flex items-center gap-4">
             <button onClick={handleBackToApp} className="text-gray-400 hover:text-[#72aee6] text-xs">Exit Dashboard</button>
             <span className="hover:text-[#72aee6] cursor-pointer">Howdy, Admin</span>
        </div>
      </div>

      <div className="flex flex-1 mt-[32px]">
        {/* Sidebar */}
        <div className="w-[160px] bg-[#23282d] text-[#f0f0f1] flex flex-col fixed h-full pb-10 overflow-y-auto">
            <ul className="mt-2">
                {menuItems.map(item => (
                    <li 
                        key={item.id} 
                        className={`px-3 py-2 cursor-pointer flex items-center gap-2 hover:bg-[#191e23] hover:text-[#72aee6] transition-colors relative group ${activeMenu === item.id ? 'bg-[#0073aa] hover:bg-[#0073aa] hover:text-white' : ''}`}
                        onClick={() => setActiveMenu(item.id)}
                    >
                         <svg className={`w-5 h-5 fill-current ${activeMenu === item.id ? 'text-white' : 'text-gray-400 group-hover:text-[#72aee6]'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                        <span className="font-semibold text-sm">{item.label}</span>
                        {/* Submenu Triangle for active */}
                        {activeMenu === item.id && (
                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#0073aa]"></div>
                        )}
                    </li>
                ))}
                 <li className="px-3 py-2 cursor-pointer flex items-center gap-2 hover:bg-[#191e23] hover:text-[#72aee6] mt-4" onClick={() => { /* collapse */ }}>
                    <div className="w-5 h-5 rounded-full border border-gray-500 flex items-center justify-center text-gray-500">
                        <span className="text-xs">&lt;</span>
                    </div>
                     <span className="text-xs text-gray-400">Collapse Menu</span>
                 </li>
            </ul>
        </div>

        {/* Main Content */}
        <div className="ml-[160px] flex-1 p-5 min-h-screen">
            {/* Top Tabs */}
            <div className="absolute top-[32px] right-0 pr-5 pt-2 flex gap-0">
                <button className="bg-[#f1f1f1] border border-t-0 border-gray-300 text-gray-600 px-4 py-1 rounded-b text-xs hover:bg-white transition-colors border-t-transparent shadow-sm">Screen Options ▼</button>
                 <button className="bg-[#f1f1f1] border border-t-0 border-gray-300 text-gray-600 px-4 py-1 rounded-b text-xs hover:bg-white transition-colors border-t-transparent shadow-sm ml-[-1px]">Help ▼</button>
            </div>

            <div className="max-w-7xl mx-auto mt-4">
                <div className="flex items-center gap-4 mb-4">
                    <h1 className="text-2xl font-normal text-[#1d2327]">Posts</h1>
                    <button className="px-3 py-1 bg-[#f6f7f7] text-[#0071a1] border border-[#0071a1] text-xs font-semibold rounded hover:bg-[#f0f0f1] hover:text-[#0071a1] transition-colors">Add New</button>
                </div>

                {/* Status Filter */}
                <div className="text-xs text-[#646970] mb-3 flex gap-1">
                    <span className="text-black font-semibold">All <span className="text-[#646970] font-normal">(12)</span></span> | 
                    <span className="text-[#0073aa] cursor-pointer hover:text-[#00a0d2]"> Published <span className="text-[#646970] font-normal">(10)</span></span> |
                    <span className="text-[#0073aa] cursor-pointer hover:text-[#00a0d2]"> Drafts <span className="text-[#646970] font-normal">(2)</span></span> |
                    <span className="text-[#0073aa] cursor-pointer hover:text-[#00a0d2]"> Trash <span className="text-[#646970] font-normal">(0)</span></span>
                </div>

                {/* Bulk Actions Bar */}
                <div className="flex justify-between items-center mb-2 p-1">
                    <div className="flex gap-2 items-center">
                        <select className="border border-[#8c8f94] text-[#2c3338] text-xs py-1 px-2 rounded h-8 bg-white">
                            <option>Bulk Actions</option>
                            <option>Edit</option>
                            <option>Move to Trash</option>
                        </select>
                        <button className="px-3 py-1 bg-[#f6f7f7] text-[#0071a1] border border-[#0071a1] text-xs rounded hover:bg-[#f0f0f1] transition-colors h-8">Apply</button>
                        
                        <select className="border border-[#8c8f94] text-[#2c3338] text-xs py-1 px-2 rounded h-8 bg-white ml-2">
                            <option>All Dates</option>
                            <option>May 2024</option>
                            <option>April 2024</option>
                        </select>
                        <select className="border border-[#8c8f94] text-[#2c3338] text-xs py-1 px-2 rounded h-8 bg-white">
                            <option>All Categories</option>
                            <option>News</option>
                            <option>Updates</option>
                        </select>
                        <button className="px-3 py-1 bg-[#f6f7f7] text-[#0071a1] border border-[#0071a1] text-xs rounded hover:bg-[#f0f0f1] transition-colors h-8">Filter</button>
                    </div>
                    <div className="flex gap-1 items-center">
                         <span className="text-[#2c3338] text-xs">12 items</span>
                         <div className="flex gap-1 ml-2">
                             <button className="px-2 py-1 bg-[#f6f7f7] border border-[#8c8f94] text-[#2c3338] text-xs rounded disabled:opacity-50" disabled>&lt;&lt;</button>
                             <button className="px-2 py-1 bg-[#f6f7f7] border border-[#8c8f94] text-[#2c3338] text-xs rounded disabled:opacity-50" disabled>&lt;</button>
                             <span className="text-xs px-1">1 of 1</span>
                             <button className="px-2 py-1 bg-[#f6f7f7] border border-[#8c8f94] text-[#2c3338] text-xs rounded disabled:opacity-50" disabled>&gt;</button>
                             <button className="px-2 py-1 bg-[#f6f7f7] border border-[#8c8f94] text-[#2c3338] text-xs rounded disabled:opacity-50" disabled>&gt;&gt;</button>
                         </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-[#c3c4c7] shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white border-b border-[#c3c4c7]">
                                <th className="p-2 w-8 text-center"><input type="checkbox" className="rounded-sm border-gray-400" /></th>
                                <th className="p-2 text-sm font-semibold text-[#1d2327] hover:text-[#1d2327] cursor-pointer">Title</th>
                                <th className="p-2 text-sm font-semibold text-[#1d2327] hover:text-[#1d2327] cursor-pointer">Author</th>
                                <th className="p-2 text-sm font-semibold text-[#1d2327] hover:text-[#1d2327] cursor-pointer">Categories</th>
                                <th className="p-2 text-sm font-semibold text-[#1d2327] hover:text-[#1d2327] cursor-pointer">Tags</th>
                                <th className="p-2 text-sm font-semibold text-[#1d2327] hover:text-[#1d2327] cursor-pointer flex items-center gap-1">
                                    Date
                                    <svg className="w-3 h-3 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#c3c4c7]">
                            {posts.map((post, index) => (
                                <tr key={post.id} className={`group ${index % 2 === 0 ? 'bg-[#f9f9f9]' : 'bg-white'} hover:bg-[#f0f6fc]`}>
                                    <th className="p-2 text-center align-top pt-3 border-l-4 border-l-transparent hover:border-l-[#72aee6]">
                                        <input type="checkbox" className="rounded-sm border-gray-400" />
                                    </th>
                                    <td className="p-2 pt-3 align-top">
                                        <div className="font-bold text-[#1d2327] text-sm mb-1 cursor-pointer group-hover:text-[#0073aa]">
                                            {post.title}
                                            {post.status === 'Draft' && <span className="ml-2 text-[#50575e] font-bold"> — Draft</span>}
                                        </div>
                                        <div className="flex gap-1 text-[11px] opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-[#0073aa] hover:underline cursor-pointer">Edit</span>
                                            <span className="text-[#a7aaad]">|</span>
                                            <span className="text-[#0073aa] hover:underline cursor-pointer">Quick Edit</span>
                                            <span className="text-[#a7aaad]">|</span>
                                            <span className="text-[#b32d2e] hover:underline cursor-pointer">Trash</span>
                                            <span className="text-[#a7aaad]">|</span>
                                            <span className="text-[#0073aa] hover:underline cursor-pointer">View</span>
                                        </div>
                                    </td>
                                    <td className="p-2 pt-3 align-top text-[#0073aa] hover:underline cursor-pointer">{post.author}</td>
                                    <td className="p-2 pt-3 align-top text-[#0073aa] hover:underline cursor-pointer">{post.categories}</td>
                                    <td className="p-2 pt-3 align-top text-[#50575e]">{post.tags || '—'}</td>
                                    <td className="p-2 pt-3 align-top text-[#50575e]">
                                        <div>{post.status}</div>
                                        <div className="text-[11px]">{post.date}</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-white border-t border-[#c3c4c7]">
                                <th className="p-2 w-8 text-center"><input type="checkbox" className="rounded-sm border-gray-400" /></th>
                                <th className="p-2 text-sm font-semibold text-[#1d2327]">Title</th>
                                <th className="p-2 text-sm font-semibold text-[#1d2327]">Author</th>
                                <th className="p-2 text-sm font-semibold text-[#1d2327]">Categories</th>
                                <th className="p-2 text-sm font-semibold text-[#1d2327]">Tags</th>
                                <th className="p-2 text-sm font-semibold text-[#1d2327]">Date</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                 <div className="flex justify-between items-center mt-2 p-1">
                     <div className="flex gap-2 items-center">
                        <select className="border border-[#8c8f94] text-[#2c3338] text-xs py-1 px-2 rounded h-8 bg-white">
                            <option>Bulk Actions</option>
                            <option>Edit</option>
                            <option>Move to Trash</option>
                        </select>
                        <button className="px-3 py-1 bg-[#f6f7f7] text-[#0071a1] border border-[#0071a1] text-xs rounded hover:bg-[#f0f0f1] transition-colors h-8">Apply</button>
                    </div>
                 </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default WordPressDashboard;
