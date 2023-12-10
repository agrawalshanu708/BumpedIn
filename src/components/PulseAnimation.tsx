import { Card, Text } from 'native-base';
import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

type Props = {
    initials?: string,
}

const PulseAnimation = (props: Props) => {

    const { initials } = props;

    const pulseValue = useRef(new Animated.Value(1)).current;

    const startPulseAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseValue, {
                    toValue: 1.2,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(pulseValue, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    };

    useEffect(() => {
        startPulseAnimation();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.pulse, { transform: [{ scale: pulseValue }] }]}
            />
            <View style={styles.initialsContainer}>
                <Text style={styles.initialsText}>{initials}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pulse: {
        position: 'absolute',
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: '#e0defd',
        opacity: 1,
    },
    initialsContainer: {
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: '#6558F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    initialsText: {
        fontSize: 25,
    },
});

PulseAnimation.defaultProps = {
    initials: '',
}

export default PulseAnimation;
