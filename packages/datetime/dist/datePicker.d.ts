import { AbstractComponent, IProps } from "@blueprintjs/core";
import * as React from "react";
import { IDatePickerBaseProps } from "./datePickerCore";
export interface IDatePickerProps extends IDatePickerBaseProps, IProps {
    /**
     * Allows the user to clear the selection by clicking the currently selected day.
     */
    canClearSelection?: boolean;
    /**
     * Initial day the calendar will display as selected.
     * This should not be set if `value` is set.
     */
    defaultValue?: Date;
    /**
     * Called when the user selects a day.
     * If being used in an uncontrolled manner, `selectedDate` will be `null` if the user clicks the currently selected
     * day. If being used in a controlled manner, `selectedDate` will contain the day clicked no matter what.
     * `hasUserManuallySelectedDate` is true if the user selected a day, and false if the date was automatically changed
     * by the user navigating to a new month or year rather than explicitly clicking on a date in the calendar.
     */
    onChange?: (selectedDate: Date, hasUserManuallySelectedDate: boolean) => void;
    /**
     * Whether the bottom bar displaying 'Today' and 'Clear' buttons should be shown.
     * @default false
     */
    showActionsBar?: boolean;
    /**
     * The currently selected day. If this prop is present, the component acts in a controlled manner.
     */
    value?: Date;
}
export interface IDatePickerState {
    displayMonth?: number;
    displayYear?: number;
    selectedDay?: number;
    value?: Date;
}
export declare class DatePicker extends AbstractComponent<IDatePickerProps, IDatePickerState> {
    static defaultProps: IDatePickerProps;
    displayName: string;
    private ignoreNextMonthChange;
    constructor(props?: IDatePickerProps, context?: any);
    render(): JSX.Element;
    componentWillReceiveProps(nextProps: IDatePickerProps): void;
    protected validateProps(props: IDatePickerProps): void;
    private disabledDays;
    private selectedDays;
    private renderCaption();
    private renderOptionsBar();
    private handleDayClick;
    private computeValidDateInSpecifiedMonthYear(displayYear, displayMonth);
    private handleMonthChange;
    private handleMonthSelectChange;
    private handleYearSelectChange;
    private setStateWithValueIfUncontrolled(newState, value);
    private handleClearClick;
    private handleTodayClick;
}
export declare const DatePickerFactory: React.ComponentFactory<IDatePickerProps & {
    children?: React.ReactNode;
}, DatePicker>;
