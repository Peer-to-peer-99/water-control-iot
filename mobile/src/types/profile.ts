import type { Component } from 'vue';

export interface ProfileItem {
    title: string;
    description?: string;
    link?: string;
    iconLeft: Component;
    iconRight?: Component;
    classesName?: string
}