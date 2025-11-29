import React from 'react';
import {
    Utensils, Car, ShoppingBag, Zap, Heart,
    Home, Briefcase, GraduationCap, TrendingUp, HelpCircle
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
    FOOD: <Utensils size={20} />,
    TRANSPORT: <Car size={20} />,
    SHOPPING: <ShoppingBag size={20} />,
    UTILITIES: <Zap size={20} />,
    ENTERTAINMENT: <Heart size={20} />,
    SALARY: <Briefcase size={20} />,
    EDUCATION: <GraduationCap size={20} />,
    INVESTMENT: <TrendingUp size={20} />,
    HOME: <Home size={20} />,
    OTHER: <HelpCircle size={20} />,
};

export const getIconByKey = (key: string): React.ReactNode => {
    return ICON_MAP[key?.toUpperCase()] || ICON_MAP.OTHER;
};