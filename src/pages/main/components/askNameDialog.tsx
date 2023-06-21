import { Button, Card, Elevation, InputGroup } from "@blueprintjs/core"
import { useState } from 'react'
import C from '../main.module.scss'
import { cleanInput } from "~Api/functions"


export function AskNameDialog(props:{go: (name:string)=>void}) {
	const [name, setName] = useState('')

	const checkNameAndGo = (name:string) => {
		if (name === '') setName('Гость')
		props.go(name)
	}

	return (
		<div className={C.shell}>
			<Card 
				elevation={Elevation.TWO} 
				className={C.card}
			>				
				<h3>Как к Вам обращаться?</h3>
				<InputGroup
					placeholder="Гость"
					onChange={el => setName(cleanInput(el.target.value))}
                    value = {name}
				/>				
				<Button
					onClick={event => checkNameAndGo(name)}
					intent={'success'}
				>
					Поехали!
				</Button>				
			</Card>
		</div>
	)
}