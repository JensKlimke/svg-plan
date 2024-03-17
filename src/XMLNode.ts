import xmlFormat from "xml-formatter";
import {attributes, KeyValueMap} from "./svg/helpers";

export default class XMLNode {
  _name : string = '';
  _id : string | undefined;
  _xml : string | undefined = undefined;
  _attributes : KeyValueMap = {};
  _children : XMLNode[] = [];

  constructor(name ?: string) {
    name && (this._name = name);
  }

  id(id : string) {
    // set ID
    this._id = id;
    // return this
    return this;
  }

  xml(xml ?: string) {
    this._xml = xml;
    return this;
  }

  add(child : XMLNode) {
    this._children.push(child);
    return this;
  }

  attributes(attr : KeyValueMap) {
    this._attributes = {...this._attributes, ...attr};
  }

  _attr() : KeyValueMap {
    const a = {...this._attributes};
    this._id && (a.id = this._id);
    return a;
  }

  code(format ?: boolean) : string {
    // generate body
    const body = this._xml || '' + this._children.map(c => c.code(false)).join(' ');
    // generate code
    let code = `<${this._name} ${attributes(this._attr())}`;
    code += (body !== '' ? `>${body}</${this._name}>` : '/>');
    // format
    try {
      return format ? xmlFormat(code) : code;
    } catch (e) {
      console.info(code);
      throw e;
    }
  }

}

