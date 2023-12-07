import { StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { FormControl, Input, Button } from 'native-base';
import { useUserProfessionalData } from '../../hooks/useUserProfessionalData';
import { ROUTES } from '../../routes/Routes';

const Form1 = (props) => {
    const { designation = '', organization = '', editMode = false, navigation } = props

    const { onSubmit, UpdateProfessionalData } = useUserProfessionalData()

    const [formData, setData] = useState({});
    const [isDesignationValueChange, setIsDesignationValueChange] = useState(true)
    const [isOrganisationValueChange, setIsOrganisationValueChange] = useState(true)

    const onDataSubmit = useCallback(() => {
        console.log('formData', formData)
        if (editMode) {
            UpdateProfessionalData(formData).then(() => {
                navigation.navigate(ROUTES.ACCOUNT_STACK.name, { screen: ROUTES.USER_ACCOUNT.name })
            }).catch((error) => {
                console.log('Error while updating the details', error)
            })
        } else {
            onSubmit(formData).then(() => {
                navigation.navigate(ROUTES.PROFILE_VIEW.name)
            }).catch((error) => {
                console.log('Error while saving the details', error)
            })
        }
    }, [formData, onSubmit, navigation])

    const handleDesignationChange = useCallback((value) => {
        setIsDesignationValueChange(value.trim() === designation)
        setData({
            ...formData,
            designation: value,
        });
    }, [formData, isDesignationValueChange])

    const handleOrganizationChange = useCallback((value) => {
        setIsOrganisationValueChange(value.trim() === organization)
        setData({
            ...formData,
            organisation: value
        });
    }, [formData, isOrganisationValueChange])

    return (
        <View>
            <FormControl>
                <FormControl.Label
                    _text={{
                        bold: true,
                    }}>
                    Designation
                </FormControl.Label>
                <Input
                    defaultValue={designation}
                    onChangeText={handleDesignationChange}
                />
                <FormControl.Label
                    _text={{
                        bold: true,
                    }}>
                    Organisation
                </FormControl.Label>
                <Input
                    defaultValue={organization}
                    onChangeText={handleOrganizationChange}
                />
            </FormControl>
            <Button isDisabled={isDesignationValueChange && isOrganisationValueChange} onPress={onDataSubmit} mt="5" colorScheme="cyan">
                Save
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({});

export default Form1;
