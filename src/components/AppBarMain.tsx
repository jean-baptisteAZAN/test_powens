import React from 'react';
import { AppBar } from '@skeletonlabs/skeleton-react';
import { ArrowLeft, Paperclip, Calendar, CircleUser, Menu } from 'lucide-react';

export const AppBarMain: React.FC = () => {
    return (
        <AppBar>
            <AppBar.Toolbar>
                <AppBar.ToolbarCenter classes="hidden sm:block">
                    <h1 className="type-scale-9 font-bold uppercase text-9xl">
                      <span
                          className="bg-gradient-radial from-tertiary-500 to-primary-500 box-decoration-clone bg-clip-text text-transparent">
                        ezBank
                     </span>
                    </h1>
                </AppBar.ToolbarCenter>
            </AppBar.Toolbar>
        </AppBar>
    );
};
