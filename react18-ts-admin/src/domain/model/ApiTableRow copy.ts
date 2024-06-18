import SysApiPageVO from "../vo/SysApiPageVO";
import KeyModel from "./KeyModel";

export default interface ApiTableRow extends KeyModel<string>, SysApiPageVO {
}