import { StyleSheet, ViewStyle } from 'react-native'
import React from 'react'

import { View, Text } from './Themed';
import { Pets } from '@/types/pets';
import Row from './Row';
import OrDivider from './OrDivider';

const cardRow = (label: string, value: string, showDivider: boolean = true) => {
    return(
        <>
            <Row style={styles.cardRow}>
                <Text style={styles.cardRowText}>
                    {label}
                </Text>
                <Text style={styles.cardRowText}>
                    {value}
                </Text>
            </Row>
            {showDivider ? <OrDivider style={styles.divider} /> : null}
        </>
    )
}

const PetCard = ({
    pet,
    style
}:{
    pet: Pets;
    style?: ViewStyle | ViewStyle[]
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.allowedText}>{`${pet.type}s`} {pet.allowed ? " Allowed" : " Not Allowed"}</Text>
      <Text style={styles.details}>{pet.details}</Text>
      {cardRow("Pet Limit", pet.limit.toString())}
      {pet.deposit ? cardRow("Pet Deposit", `$${pet.deposit}`): null}
      {pet.rent ? cardRow("Monthly Pet Rent", `$${pet.rent}`): null}
      {pet.fee ? cardRow("One Time Fee", `$${pet.fee}`): null}
      {pet.interview ? cardRow("Pet Limit", `Required`): cardRow("Pet Limit", `Not Required`)}
      {pet.interview ? cardRow("Sprayed/Neutered", `Required`): cardRow("Sprayed/Neutered", `Not Required`)}
      {pet.interview ? cardRow("Declawed", `Required`, false): cardRow("Declawed", `Not Required`, false)}
    </View>
  )
}

export default PetCard

const styles = StyleSheet.create({
    container:{
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        padding: 7,
        width: 250,
    },
    allowedText:{
        textTransform: "capitalize",
        fontWeight: "bold",
        marginBottom: 5,
    },
    details:{},
    cardRow:{
        paddingVertical: 5
    },
    cardRowText:{
        fontWeight: "bold"
    },
    divider:{
    },
})