import {
    Home, Utensils, Car, ShoppingBag, Zap, Heart,
    Briefcase, GraduationCap, TrendingUp, HelpCircle,
    Smartphone, Coffee, Plane
} from "lucide-react";
import React from "react";

export const ICON_LIBRARY: Record<string, React.ReactNode> = {
    UTENSILS: <Utensils size={20} />,
    FOOD: <Utensils size={20} />,

    CAR: <Car size={20} />,
    TRANSPORT: <Car size={20} />,

    SHOPPINGBAG: <ShoppingBag size={20} />,
    SHOPPING: <ShoppingBag size={20} />,

    HOME: <Home size={20} />,
    ZAP: <Zap size={20} />,
    UTILITIES: <Zap size={20} />,

    HEART: <Heart size={20} />,
    ENTERTAINMENT: <Heart size={20} />,

    BRIEFCASE: <Briefcase size={20} />,
    SALARY: <Briefcase size={20} />,

    GRADUATIONCAP: <GraduationCap size={20} />,
    EDUCATION: <GraduationCap size={20} />,

    TRENDINGUP: <TrendingUp size={20} />,
    INVESTMENT: <TrendingUp size={20} />,

    PLANE: <Plane size={20} />,
    SMARTPHONE: <Smartphone size={20} />,
    COFFEE: <Coffee size={20} />,

    OTHER: <HelpCircle size={20} />,
    HELPCIRCLE: <HelpCircle size={20} />
};

export const getIconByKey = (key: string): React.ReactNode => {
    const safeKey = key?.toUpperCase();
    return ICON_LIBRARY[safeKey] || ICON_LIBRARY.HOME;
};

export const getIconOptions = () => Object.keys(ICON_LIBRARY);