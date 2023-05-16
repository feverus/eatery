import * as I from '~Store/storeInterfaces';
import menuStore from "~Store/menuStore";
import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";
import C from './editFormSection.module.scss'
import { SectionItemEditorType } from "./editFormSection.props";
import React, { useState, useEffect } from "react"
import useToast from "~Components/toast"

export function SectionItemEditor({ id = '', api }: SectionItemEditorType) {
  const finded = menuStore.section.find(el => el.id === id);
  const initValue = (finded !== undefined) ? finded.name : '';
  const [value, setValue] = useState(initValue);
  const [showToast] = useToast();

  useEffect(() => {
    if (id === '')
      setValue('');
  }, [menuStore.section]);

  const save = () => {
    if (value === '') {
      showToast('Укажите имя категории');
      return;
    }

    const sectionToSave: I.Section = {
      position: menuStore.section.length,
      id: id,
      name: value,
      version: 0
    };
    api.handleApprove(sectionToSave);
  };

  return (
    <ControlGroup className={C.item}>
      <InputGroup
        className={C.inputGroup}
        value={value}
        onChange={e => setValue(e.target.value)} />
      <Button
        icon="cloud-upload"
        onClick={() => save()} />
      {id !== '' && <Button
        icon="trash"
        onClick={() => api.handleDelete(id)} />}
    </ControlGroup>
  )
}
