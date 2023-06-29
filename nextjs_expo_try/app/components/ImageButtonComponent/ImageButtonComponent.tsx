import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

const ImageButtonComponent = ({ onPress, source, style, resizeMode = 'cover' }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={source} style={style} resizeMode={resizeMode as 'cover' | 'contain' | 'stretch' | 'repeat' | 'center'} />
        </TouchableOpacity>
    );
};

export default ImageButtonComponent;
