'use client';

import React, {JSX} from 'react';
import clsx from 'clsx';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'| 'xxl' | 'full';
type SpacingToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface TailwindContainerProps {
    children?: React.ReactNode;
    size?: Size;
    fluid?: boolean;
    center?: boolean;
    p?: SpacingToken;
    px?: SpacingToken;
    py?: SpacingToken;
    pt?: SpacingToken;
    pb?: SpacingToken;
    pl?: SpacingToken;
    pr?: SpacingToken;
    mt?: SpacingToken;
    mb?: SpacingToken;
    className?: string;
    as?: keyof JSX.IntrinsicElements;
}

const sizeToMaxWidth: Record<Size, string> = {
    xs: 'max-w-xl',
    sm: 'max-w-2xl',
    md: 'max-w-3xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    xxl: 'max-w-8xl',
    full: 'w-full',
};

const spacingTokenToClass: Record<SpacingToken, string> = {
    none: '',
    xs: '2',
    sm: '4',
    md: '6',
    lg: '8',
    xl: '12',
    xxl:'20'
};

function tokenToPaddingClass(prefix: string, token?: SpacingToken) {
    if (!token || token === 'none') return '';
    const v = spacingTokenToClass[token];
    return `${prefix}-${v}`;
}

export default function TailwindContainer({
                                              children,
                                              size = 'md',
                                              fluid = false,
                                              center = true,
                                              p,
                                              px,
                                              py,
                                              pt,
                                              pb,
                                              pl,
                                              pr,
                                              mt,
                                              mb,
                                              className,
                                              as: Component = 'div',
                                          }: TailwindContainerProps) {
    const widthClass = fluid ? 'w-full' : sizeToMaxWidth[size];
    const paddingClasses = clsx(
        p && tokenToPaddingClass('p', p),
        px && tokenToPaddingClass('px', px),
        py && tokenToPaddingClass('py', py),
        pt && tokenToPaddingClass('pt', pt),
        pb && tokenToPaddingClass('pb', pb),
        pl && tokenToPaddingClass('pl', pl),
        pr && tokenToPaddingClass('pr', pr)
    );

    const marginClasses = clsx(mt && tokenToPaddingClass('mt', mt), mb && tokenToPaddingClass('mb', mb));

    const centerClass = center && !fluid ? 'mx-auto' : '';

    const base = clsx('w-full', widthClass, centerClass, paddingClasses, marginClasses, className);

    return <Component className={base}>{children}</Component>;
}
