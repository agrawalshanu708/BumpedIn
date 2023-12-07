import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { FormControl, Input } from 'native-base';

const Form1 = () => {
    const [formData, setData] = useState({});
    return (
        <FormControl>
            <FormControl.Label
                _text={{
                    bold: true,
                }}>
                Designation
            </FormControl.Label>
            <Input
                placeholder="John"
                onChangeText={value =>
                    setData({
                        ...formData,
                        designation: value,
                    })
                }
            />
            <FormControl.Label
                _text={{
                    bold: true,
                }}>
                Organisation
            </FormControl.Label>
            <Input
                placeholder="John"
                onChangeText={value =>
                    setData({
                        ...formData,
                        organisation: value,
                    })
                }
            />
        </FormControl>
    );
};

const styles = StyleSheet.create({});

export default Form1;
