import { formatCurrency } from '../../../utils/formatCurrency';
import React from "react";
import './StatCard.scss';

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    positive?: boolean;
    description: string;
}

export const StatCard = ({
                             title,
                             value,
                             icon,
                             positive = true,
                             description
                         }: StatCardProps) => {
    const valueColor = positive ? 'green' : 'red';

    return (
        <div className="dashCard d-flex align-items-center p-4">
            <div className={"content me-3"}>
                <div className="header">
                    <span>{title}</span>
                </div>
                <div className={`value-${valueColor} my-1`}>
                    {formatCurrency(value)}
                </div>
                <div className={"description"}>
                    {description}
                </div>
            </div>
            <div className={`icon-${valueColor}`}>
                {icon}
            </div>
        </div>

        // <Card className="bg-gradient-to-br">
        //     <CardHeader>
        //         <Flex justify="between" align="center">
        //             <CardDescription>{title}</CardDescription>
        //         </Flex>
        //     </CardHeader>
        //     <CardContent className='rt-Flex rt-r-fd-row'>
        //         <div>
        //         <Text
        //             size="8"
        //             weight="bold"
        //             color={valueColor}
        //             as="p"
        //         >
        //             {formatCurrency(value)}
        //         </Text>
        //         <CardDescription className="mt-2">
        //             {description}
        //         </CardDescription>
        //         </div>
        //         {icon}
        //     </CardContent>
        // </Card>
    );
};