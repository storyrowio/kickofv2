'use client'

import IconButton from "components/ui/buttons/IconButton";
import {AtIcon, Idea01Icon, Message02Icon, Notification01Icon, SystemUpdate01Icon} from "hugeicons-react";
import classNames from "classnames";

const NotificationIcons = {
    message: { icon: Message02Icon, bgColor: 'bg-green-100', textColor: 'text-green-600'},
    mention: { icon: AtIcon, bgColor: 'bg-amber-100', textColor: 'text-amber-600'},
    system: { icon: SystemUpdate01Icon, bgColor: 'bg-teal-100', textColor: 'text-teal-600'},
    activity: { icon: Idea01Icon, bgColor: 'bg-rose-100', textColor: 'text-rose-600'},
    reminder: { icon: SystemUpdate01Icon, bgColor: 'bg-indigo-100', textColor: 'text-indigo-600'},
};

export default function AppNavbarNotification() {
    const notifications = [
        {
            "id": 1,
            "type": "message",
            "title": "New message from Alice",
            "content": "Hey! Are you joining the meeting later?",
            "timestamp": "2025-04-10T09:15:00Z",
            "read": false
        },
        {
            "id": 2,
            "type": "mention",
            "title": "You were mentioned in a comment",
            "content": "@you Can you check this issue?",
            "timestamp": "2025-04-10T08:50:00Z",
            "read": false
        },
        {
            "id": 3,
            "type": "system",
            "title": "System Update Available",
            "content": "A new version of the app is ready to install.",
            "timestamp": "2025-04-09T18:30:00Z",
            "read": true
        },
        {
            "id": 4,
            "type": "activity",
            "title": "John liked your post",
            "content": "Your recent post on productivity tips got a new like.",
            "timestamp": "2025-04-09T17:00:00Z",
            "read": true
        },
        {
            "id": 5,
            "type": "reminder",
            "title": "Meeting at 3 PM",
            "content": "Don't forget your meeting with the design team at 3 PM.",
            "timestamp": "2025-04-10T06:00:00Z",
            "read": false
        }
    ];

    return (
        <div className="dropdown dropdown-end">
            <div className="h-full flex items-center">
                <IconButton tabIndex={0} role="button" className="!p-2.5 !rounded-full">
                    <Notification01Icon size={18} className="text-neutral-500"/>
                </IconButton>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content w-96 bg-base-100 rounded-box z-1 mt-6 w-52 p-2 shadow-xl/2 border border-neutral-200">
                {notifications.map((e, i) => {
                    const Icon = NotificationIcons[e.type].icon;
                    const bgColor = NotificationIcons[e.type].bgColor;
                    const textColor = NotificationIcons[e.type].textColor;
                    const iconClassNames = classNames({
                        'w-10 h-10 flex items-center justify-center rounded-full': true,
                        [bgColor]: true,
                    })

                    return (
                        <li key={i}>
                            <div className="mt-2 flex-row flex-nowrap gap-4">
                                <div className={iconClassNames}>
                                    <Icon className={textColor}/>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold">{e.title}</p>
                                    <p>{e.content}</p>
                                </div>
                            </div>
                        </li>
                    )
                })}
                <li>
                    <div className="h-0.25 w-full p-0 my-2 bg-neutral-200"/>
                    <div className="py-2.5 rounded-md flex justify-center text-primary-600 text-md font-semibold">
                        See All Notification
                    </div>
                </li>
            </ul>
        </div>
    )
}
