import React from "react";
import styled from "styled-components";
import { Breadcrumb as AntdBreadcrumb } from "antd";

const BreadcrumbContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    max-width: 100%;
    padding: 41px 0;
    margin-left: 121px;

    .ant-breadcrumb-separator {
        color: #414ABA;
    }
`;

interface BreadcrumbItem {
    title: string;
    style: React.CSSProperties;
}

const CustomBreadcrumb: React.FC = () => {
    const breadcrumbItems: BreadcrumbItem[] = [
        {
            title: 'Inicio',
            style: {
                fontFamily: 'TT-Supermolot-Bold',
                fontSize: '18px',
                fontWeight: 'bold',
                lineHeight: '22.23px',
                color: '#414ABA',
            }
        },
        {
            title: 'Cadastro de dados metereológicos',
            style: {
                fontFamily: 'TT-Supermolot-Regular',
                fontSize: '18px',
                fontWeight: 400,
                lineHeight: '22.14px',
                color: '#414ABA'
            }
        }
    ];

    return (
        <BreadcrumbContainer>
            <AntdBreadcrumb 
                items={breadcrumbItems}
                itemRender={(route, _, routes) => {
                    const item = route as BreadcrumbItem;
                    return (
                        <span style={item.style}>{item.title}</span>
                    );
                }}
            />
        </BreadcrumbContainer>
    );
};

export default CustomBreadcrumb;