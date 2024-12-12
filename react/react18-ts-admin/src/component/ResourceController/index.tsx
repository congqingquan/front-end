import ResourceIdentifiers from "@/common/Constants/ResourceIdentifiers";
import MenuContext from '@/context/MenuContext';
import { MenuContextData } from '@/common/Type';
import React, { useContext } from "react";

const ResourceController: React.FC<{ identifier: ResourceIdentifiers, children: React.ReactElement }> = ({identifier, children}) => {
    const menuContextData = useContext<MenuContextData>(MenuContext);
    return menuContextData.userMenuBtnMap.get(identifier) && children;
};

export default ResourceController;