import { StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { FormControl, Input, Button } from 'native-base';
import { useUserData } from '../../hooks/useUserData';
import { ROUTES } from '../../routes/Routes';
import { isLoading } from '../../utils';

type UserFormDataType = {
    designation?: string,
    organization?: string,
}

type Props = {
    designation?: string,
    organization?: string,
    editMode?: boolean,
    navigation?: any
}

const Form1 = (props: Props) => {
    const { designation = '', organization = '', editMode = false, navigation } = props

    const { onSubmit, onUpdate, submitStatus } = useUserData()

    const [formData, setData] = useState<UserFormDataType>({});
    const [isDesignationValueChange, setIsDesignationValueChange] = useState(true)
    const [isOrganisationValueChange, setIsOrganisationValueChange] = useState(true)

    const onDataSubmit = useCallback(() => {
        console.log('formData', formData)
        if (editMode) {
            onSubmit(formData).then(() => {
                navigation.navigate(ROUTES.ACCOUNT_STACK.name, { screen: ROUTES.USER_ACCOUNT.name })
            }).catch((error) => {
                console.log('Error while updating the details', error)
            })
        } else {
            onSubmit(formData).then(() => {
                console.log('Successfully updated')
                navigation.navigate(ROUTES.PROFILE_VIEW.name)
            }).catch((error: any) => {
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
            organization: value
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
            <View style={styles.actionContainer}>
                <Button isLoading={isLoading(submitStatus)} style={styles.saveCta} backgroundColor={'primary.900'} onPress={onDataSubmit} mt="5" colorScheme="cyan">
                    Save
                </Button>
            </View>
        </View>
    );
};
// isDisabled={isDesignationValueChange && isOrganisationValueChange}

const styles = StyleSheet.create({
    actionContainer: {
        alignItems: 'flex-start'
    },
    saveCta: {
        width: 70
    }
});

export default Form1;
