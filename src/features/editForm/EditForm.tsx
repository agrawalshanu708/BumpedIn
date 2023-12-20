import React from 'react'
import { StyleSheet, View } from 'react-native'

import { useUserData } from '../../hooks/useUserData'
import Form1 from '../../components/form/Form'


const EditForm = ({ navigation }: { navigation: any }) => {

    const { formData } = useUserData()

    return (
        <View style={styles.container}>
            <Form1
                designation={formData?.designation}
                organization={formData?.organization}
                navigation={navigation}
                editMode={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingVertical: 24,
    }
})

export default EditForm
