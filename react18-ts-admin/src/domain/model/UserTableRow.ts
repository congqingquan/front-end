import SysUserPageVO from "../vo/SysUserPageVO";
import KeyModel from "./KeyModel";

export default interface UserTableRow extends KeyModel<string>, Omit<SysUserPageVO, 'id'> {
}