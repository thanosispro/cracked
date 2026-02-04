import Link from 'next/link';
import { LayoutDashboard, Upload, Settings } from 'lucide-react';
import { useRouter } from 'next/router';

export default function AdminNavigation() {
    const router = useRouter();

    const navItems = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Upload Questions', href: '/admin/upload_question', icon: Upload },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
                {navItems.map((item) => {
                    const isActive = router.pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={16} />
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
