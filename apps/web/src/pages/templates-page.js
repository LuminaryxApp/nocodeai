import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { LayoutTemplate, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
export function TemplatesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    return (_jsxs("div", { className: "p-6 lg:p-8", children: [_jsx("div", { className: "flex items-center justify-between mb-8", children: _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Templates" }), _jsx("p", { className: "text-muted-foreground", children: "Start with pre-built workflow templates" })] }) }), _jsx("div", { className: "mb-6", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search templates...", className: "pl-10", value: searchQuery, onChange: (e) => { setSearchQuery(e.target.value); } })] }) }), _jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: _jsx(Card, { className: "col-span-full", children: _jsxs(CardContent, { className: "flex flex-col items-center justify-center py-12", children: [_jsx(LayoutTemplate, { className: "h-12 w-12 text-muted-foreground mb-4" }), _jsx(CardTitle, { className: "text-lg mb-2", children: "Templates coming soon" }), _jsx(CardDescription, { className: "text-center mb-4", children: "We're working on building a library of pre-built templates for you" }), _jsxs(Button, { variant: "outline", children: [_jsx(Sparkles, { className: "mr-2 h-4 w-4" }), "Browse Featured"] })] }) }) })] }));
}
