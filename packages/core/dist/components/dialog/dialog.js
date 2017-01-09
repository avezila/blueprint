/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the BSD-3 License as modified (the “License”); you may obtain a copy
 * of the license at https://github.com/palantir/blueprint/blob/master/LICENSE
 * and https://github.com/palantir/blueprint/blob/master/PATENTS
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var classNames = require("classnames");
var React = require("react");
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var Errors = require("../../common/errors");
var overlay_1 = require("../overlay/overlay");
var Dialog = (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        _super.apply(this, arguments);
        this.displayName = "Blueprint.Dialog";
    }
    Dialog.prototype.render = function () {
        return (React.createElement(overlay_1.Overlay, __assign({}, this.props, {className: classNames((_a = {}, _a[Classes.OVERLAY_SCROLL_CONTAINER] = !this.props.inline, _a)), hasBackdrop: true}), 
            React.createElement("div", {className: classNames(Classes.DIALOG, this.props.className), style: this.props.style}, 
                this.maybeRenderHeader(), 
                this.props.children)
        ));
        var _a;
    };
    Dialog.prototype.validateProps = function (props) {
        if (props.title == null) {
            if (props.iconName != null) {
                console.error(Errors.WARNING_DIALOG_NO_HEADER_ICON);
            }
            if (props.isCloseButtonShown != null) {
                console.error(Errors.WARNING_DIALOG_NO_HEADER_CLOSE_BUTTON);
            }
        }
    };
    Dialog.prototype.maybeRenderCloseButton = function () {
        // for now, show close button if prop is undefined or null
        // this gives us a behavior as if the default value were `true`
        if (this.props.isCloseButtonShown !== false) {
            var classes = classNames(Classes.DIALOG_CLOSE_BUTTON, Classes.iconClass("small-cross"));
            return React.createElement("button", {"aria-label": "Close", className: classes, onClick: this.props.onClose});
        }
        else {
            return undefined;
        }
    };
    Dialog.prototype.maybeRenderHeader = function () {
        if (this.props.title == null) {
            return undefined;
        }
        var maybeIcon;
        if (this.props.iconName != null) {
            maybeIcon = React.createElement("span", {className: classNames(Classes.ICON_LARGE, Classes.iconClass(this.props.iconName))});
        }
        return (React.createElement("div", {className: Classes.DIALOG_HEADER}, 
            maybeIcon, 
            React.createElement("h5", null, this.props.title), 
            this.maybeRenderCloseButton()));
    };
    Dialog.defaultProps = {
        isOpen: false,
    };
    return Dialog;
}(abstractComponent_1.AbstractComponent));
exports.Dialog = Dialog;
exports.DialogFactory = React.createFactory(Dialog);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL2RpYWxvZy9kaWFsb2cudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixrQ0FBa0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUNuRSxJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELElBQVksTUFBTSxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFFOUMsd0JBQTJELG9CQUFvQixDQUFDLENBQUE7QUEyQ2hGO0lBQTRCLDBCQUFtQztJQUEvRDtRQUE0Qiw4QkFBbUM7UUFLcEQsZ0JBQVcsR0FBRyxrQkFBa0IsQ0FBQztJQXdENUMsQ0FBQztJQXREVSx1QkFBTSxHQUFiO1FBQ0ksTUFBTSxDQUFDLENBQ0gsb0JBQUMsaUJBQU8sZUFDQSxJQUFJLENBQUMsS0FBSyxHQUNkLFNBQVMsRUFBRSxVQUFVLENBQUMsVUFBRSxHQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxHQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUUsQ0FBRSxFQUNsRixXQUFXLEVBQUUsSUFBSztZQUVsQixxQkFBQyxHQUFHLElBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFFLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBTTtnQkFDckYsSUFBSSxDQUFDLGlCQUFpQixFQUFHO2dCQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVMsQ0FDbkI7U0FDQSxDQUNiLENBQUM7O0lBQ04sQ0FBQztJQUVTLDhCQUFhLEdBQXZCLFVBQXdCLEtBQW1CO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDeEQsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1lBQ2hFLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVPLHVDQUFzQixHQUE5QjtRQUNJLDBEQUEwRDtRQUMxRCwrREFBK0Q7UUFDL0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFDLElBQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzFGLE1BQU0sQ0FBQyxxQkFBQyxNQUFNLEtBQUMsVUFBVSxHQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUUsT0FBUSxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQVEsRUFBRyxDQUFDO1FBQzFGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQztJQUNMLENBQUM7SUFFTyxrQ0FBaUIsR0FBekI7UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUVELElBQUksU0FBc0IsQ0FBQztRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlCLFNBQVMsR0FBRyxxQkFBQyxJQUFJLElBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBRSxFQUFHLENBQUM7UUFDNUcsQ0FBQztRQUNELE1BQU0sQ0FBQyxDQUNILHFCQUFDLEdBQUcsSUFBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLGFBQWM7WUFDakMsU0FBVTtZQUNYLHFCQUFDLEVBQUUsU0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQU0sQ0FBSztZQUMxQixJQUFJLENBQUMsc0JBQXNCLEVBQUcsQ0FDN0IsQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQTNEYSxtQkFBWSxHQUFpQjtRQUN2QyxNQUFNLEVBQUUsS0FBSztLQUNoQixDQUFDO0lBMEROLGFBQUM7QUFBRCxDQTdEQSxBQTZEQyxDQTdEMkIscUNBQWlCLEdBNkQ1QztBQTdEWSxjQUFNLFNBNkRsQixDQUFBO0FBRVkscUJBQWEsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvZGlhbG9nL2RpYWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNSBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5cbmltcG9ydCB7IEFic3RyYWN0Q29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9hYnN0cmFjdENvbXBvbmVudFwiO1xuaW1wb3J0ICogYXMgQ2xhc3NlcyBmcm9tIFwiLi4vLi4vY29tbW9uL2NsYXNzZXNcIjtcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tIFwiLi4vLi4vY29tbW9uL2Vycm9yc1wiO1xuaW1wb3J0IHsgSVByb3BzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wcm9wc1wiO1xuaW1wb3J0IHsgSUJhY2tkcm9wUHJvcHMsIElPdmVybGF5YWJsZVByb3BzLCBPdmVybGF5IH0gZnJvbSBcIi4uL292ZXJsYXkvb3ZlcmxheVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElEaWFsb2dQcm9wcyBleHRlbmRzIElPdmVybGF5YWJsZVByb3BzLCBJQmFja2Ryb3BQcm9wcywgSVByb3BzIHtcbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBvdmVybGF5IGFuZCBpdHMgY2hpbGRyZW4uXG4gICAgICogVGhpcyBwcm9wIGlzIHJlcXVpcmVkIGJlY2F1c2UgdGhlIGNvbXBvbmVudCBpcyBjb250cm9sbGVkLlxuICAgICAqL1xuICAgIGlzT3BlbjogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIERpYWxvZyBhbHdheXMgaGFzIGEgYmFja2Ryb3Agc28gdGhpcyBwcm9wIGlzIGV4Y2x1ZGVkIGZyb20gdGhlIHB1YmxpYyBBUEkuXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgaGFzQmFja2Ryb3A/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogTmFtZSBvZiBpY29uICh0aGUgcGFydCBhZnRlciBgcHQtaWNvbi1gKSB0byBhcHBlYXIgaW4gdGhlIGRpYWxvZydzIGhlYWRlci5cbiAgICAgKiBOb3RlIHRoYXQgdGhlIGhlYWRlciB3aWxsIG9ubHkgYmUgcmVuZGVyZWQgaWYgYHRpdGxlYCBpcyBwcm92aWRlZC5cbiAgICAgKi9cbiAgICBpY29uTmFtZT86IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gc2hvdyB0aGUgY2xvc2UgXCJYXCIgYnV0dG9uIGluIHRoZSBkaWFsb2cncyBoZWFkZXIuXG4gICAgICogTm90ZSB0aGF0IHRoZSBoZWFkZXIgd2lsbCBvbmx5IGJlIHJlbmRlcmVkIGlmIGB0aXRsZWAgaXMgcHJvdmlkZWQuXG4gICAgICogQGRlZmF1bHQgdHJ1ZVxuICAgICAqL1xuICAgIGlzQ2xvc2VCdXR0b25TaG93bj86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBDU1MgU3R5bGVzIHRvIGFwcGx5IHRvIHRoZSAucHQtZGlhbG9nIGVsZW1lbnQuXG4gICAgICogQGRlZmF1bHQge31cbiAgICAgKi9cbiAgICBzdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XG5cbiAgICAvKipcbiAgICAgKiBUaXRsZSBvZiBkaWFsb2cuXG4gICAgICogSWYgcHJvdmlkZWQsIGEgYC5wdC1kaWFsb2ctaGVhZGVyYCBlbGVtZW50IHdpbGwgYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBkaWFsb2dcbiAgICAgKiBiZWZvcmUgYW55IGNoaWxkcmVuIGVsZW1lbnRzLlxuICAgICAqIEluIHRoZSBuZXh0IG1ham9yIHZlcnNpb24sIHRoaXMgcHJvcCB3aWxsIGJlIHJlcXVpcmVkLlxuICAgICAqL1xuICAgIHRpdGxlPzogc3RyaW5nIHwgSlNYLkVsZW1lbnQ7XG59XG5cbmV4cG9ydCBjbGFzcyBEaWFsb2cgZXh0ZW5kcyBBYnN0cmFjdENvbXBvbmVudDxJRGlhbG9nUHJvcHMsIHt9PiB7XG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHM6IElEaWFsb2dQcm9wcyA9IHtcbiAgICAgICAgaXNPcGVuOiBmYWxzZSxcbiAgICB9O1xuXG4gICAgcHVibGljIGRpc3BsYXlOYW1lID0gXCJCbHVlcHJpbnQuRGlhbG9nXCI7XG5cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPE92ZXJsYXlcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoeyBbQ2xhc3Nlcy5PVkVSTEFZX1NDUk9MTF9DT05UQUlORVJdOiAhdGhpcy5wcm9wcy5pbmxpbmUgfSl9XG4gICAgICAgICAgICAgICAgaGFzQmFja2Ryb3A9e3RydWV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoQ2xhc3Nlcy5ESUFMT0csIHRoaXMucHJvcHMuY2xhc3NOYW1lKX0gc3R5bGU9e3RoaXMucHJvcHMuc3R5bGV9PlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5tYXliZVJlbmRlckhlYWRlcigpfVxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvT3ZlcmxheT5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdmFsaWRhdGVQcm9wcyhwcm9wczogSURpYWxvZ1Byb3BzKSB7XG4gICAgICAgIGlmIChwcm9wcy50aXRsZSA9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAocHJvcHMuaWNvbk5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoRXJyb3JzLldBUk5JTkdfRElBTE9HX05PX0hFQURFUl9JQ09OKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9wcy5pc0Nsb3NlQnV0dG9uU2hvd24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoRXJyb3JzLldBUk5JTkdfRElBTE9HX05PX0hFQURFUl9DTE9TRV9CVVRUT04pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXliZVJlbmRlckNsb3NlQnV0dG9uKCkge1xuICAgICAgICAvLyBmb3Igbm93LCBzaG93IGNsb3NlIGJ1dHRvbiBpZiBwcm9wIGlzIHVuZGVmaW5lZCBvciBudWxsXG4gICAgICAgIC8vIHRoaXMgZ2l2ZXMgdXMgYSBiZWhhdmlvciBhcyBpZiB0aGUgZGVmYXVsdCB2YWx1ZSB3ZXJlIGB0cnVlYFxuICAgICAgICBpZiAodGhpcy5wcm9wcy5pc0Nsb3NlQnV0dG9uU2hvd24gIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gY2xhc3NOYW1lcyhDbGFzc2VzLkRJQUxPR19DTE9TRV9CVVRUT04sIENsYXNzZXMuaWNvbkNsYXNzKFwic21hbGwtY3Jvc3NcIikpO1xuICAgICAgICAgICAgcmV0dXJuIDxidXR0b24gYXJpYS1sYWJlbD1cIkNsb3NlXCIgY2xhc3NOYW1lPXtjbGFzc2VzfSBvbkNsaWNrPXt0aGlzLnByb3BzLm9uQ2xvc2V9IC8+O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgbWF5YmVSZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRpdGxlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWF5YmVJY29uOiBKU1guRWxlbWVudDtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaWNvbk5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgbWF5YmVJY29uID0gPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKENsYXNzZXMuSUNPTl9MQVJHRSwgQ2xhc3Nlcy5pY29uQ2xhc3ModGhpcy5wcm9wcy5pY29uTmFtZSkpfSAvPjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e0NsYXNzZXMuRElBTE9HX0hFQURFUn0+XG4gICAgICAgICAgICAgICAge21heWJlSWNvbn1cbiAgICAgICAgICAgICAgICA8aDU+e3RoaXMucHJvcHMudGl0bGV9PC9oNT5cbiAgICAgICAgICAgICAgICB7dGhpcy5tYXliZVJlbmRlckNsb3NlQnV0dG9uKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBEaWFsb2dGYWN0b3J5ID0gUmVhY3QuY3JlYXRlRmFjdG9yeShEaWFsb2cpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
