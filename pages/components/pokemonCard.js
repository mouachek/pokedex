import React from 'react';

import { Card } from 'react-bootstrap';

import styles from '../../styles/Home.module.css'

const pokemonCard = ({id, image, name, type}) => {
    return (
            <Card>
                <Card.Img src={image} alt={name} variant="top" className={styles.cardImage} />
                <Card.Body>
                    <Card.Title>id : #0{id}</Card.Title>
                    <h3>{name}</h3>
                    <Card.Text>
                        Type : {type}
                    </Card.Text>
                </Card.Body>
            </Card>
    )
}

export default pokemonCard;

