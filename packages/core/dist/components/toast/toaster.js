/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var ReactDOM = require("react-dom");
var abstractComponent_1 = require("../../common/abstractComponent");
var Classes = require("../../common/classes");
var errors_1 = require("../../common/errors");
var keys_1 = require("../../common/keys");
var position_1 = require("../../common/position");
var utils_1 = require("../../common/utils");
var overlay_1 = require("../overlay/overlay");
var toast_1 = require("./toast");
var Toaster = (function (_super) {
    __extends(Toaster, _super);
    function Toaster() {
        var _this = this;
        _super.apply(this, arguments);
        this.state = {
            toasts: [],
        };
        // auto-incrementing identifier for un-keyed toasts
        this.toastId = 0;
        this.getDismissHandler = function (toast) { return function (timeoutExpired) {
            _this.dismiss(toast.key, timeoutExpired);
        }; };
        this.handleClose = function (e) {
            // NOTE that `e` isn't always a KeyboardEvent but that's the only type we care about
            if (e.which === keys_1.ESCAPE) {
                _this.clear();
            }
        };
    }
    /**
     * Create a new `Toaster` instance that can be shared around your application.
     * The `Toaster` will be rendered into a new element appended to the given container.
     */
    Toaster.create = function (props, container) {
        if (container === void 0) { container = document.body; }
        if (props != null && props.inline != null) {
            console.warn(errors_1.TOASTER_INLINE_WARNING);
        }
        var containerElement = document.createElement("div");
        container.appendChild(containerElement);
        return ReactDOM.render(React.createElement(Toaster, __assign({}, props, {inline: true})), containerElement);
    };
    Toaster.prototype.show = function (props) {
        var options = this.createToastOptions(props);
        this.setState(function (prevState) { return ({
            toasts: [options].concat(prevState.toasts),
        }); });
        return options.key;
    };
    Toaster.prototype.update = function (key, props) {
        var options = this.createToastOptions(props, key);
        this.setState(function (prevState) { return ({
            toasts: prevState.toasts.map(function (t) { return t.key === key ? options : t; }),
        }); });
    };
    Toaster.prototype.dismiss = function (key, timeoutExpired) {
        if (timeoutExpired === void 0) { timeoutExpired = false; }
        this.setState(function (_a) {
            var toasts = _a.toasts;
            return ({
                toasts: toasts.filter(function (t) {
                    var matchesKey = t.key === key;
                    if (matchesKey) {
                        utils_1.safeInvoke(t.onDismiss, timeoutExpired);
                    }
                    return !matchesKey;
                }),
            });
        });
    };
    Toaster.prototype.clear = function () {
        this.state.toasts.map(function (t) { return utils_1.safeInvoke(t.onDismiss, false); });
        this.setState({ toasts: [] });
    };
    Toaster.prototype.getToasts = function () {
        return this.state.toasts;
    };
    Toaster.prototype.render = function () {
        // $pt-transition-duration * 3 + $pt-transition-duration / 2
        var classes = classNames(Classes.TOAST_CONTAINER, this.getPositionClasses(), this.props.className);
        return (React.createElement(overlay_1.Overlay, {autoFocus: this.props.autoFocus, canEscapeKeyClose: this.props.canEscapeKeyClear, canOutsideClickClose: false, className: classes, enforceFocus: false, hasBackdrop: false, inline: this.props.inline, isOpen: this.state.toasts.length > 0, onClose: this.handleClose, transitionDuration: 350, transitionName: "pt-toast"}, this.state.toasts.map(this.renderToast, this)));
    };
    Toaster.prototype.validateProps = function (props) {
        if (props.position === position_1.Position.LEFT || props.position === position_1.Position.RIGHT) {
            throw new Error("Toaster does not support LEFT or RIGHT positions.");
        }
    };
    Toaster.prototype.renderToast = function (toast) {
        return React.createElement(toast_1.Toast, __assign({}, toast, {onDismiss: this.getDismissHandler(toast)}));
    };
    Toaster.prototype.createToastOptions = function (props, key) {
        if (key === void 0) { key = "toast-" + this.toastId++; }
        // clone the object before adding the key prop to avoid leaking the mutation
        var options = utils_1.shallowClone(props);
        options.key = key;
        return options;
    };
    Toaster.prototype.getPositionClasses = function () {
        var positions = position_1.Position[this.props.position].split("_");
        // NOTE that there is no -center class because that's the default style
        return positions.map(function (p) { return (Classes.TOAST_CONTAINER + "-" + p.toLowerCase()); });
    };
    Toaster.defaultProps = {
        autoFocus: false,
        canEscapeKeyClear: true,
        inline: false,
        position: position_1.Position.TOP,
    };
    Toaster = __decorate([
        PureRender
    ], Toaster);
    return Toaster;
}(abstractComponent_1.AbstractComponent));
exports.Toaster = Toaster;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL3RvYXN0L3RvYXN0ZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztHQUtHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLFVBQVUsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3BELElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBQy9CLElBQVksUUFBUSxXQUFNLFdBQVcsQ0FBQyxDQUFBO0FBRXRDLGtDQUFrQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ25FLElBQVksT0FBTyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsdUJBQXVDLHFCQUFxQixDQUFDLENBQUE7QUFDN0QscUJBQXVCLG1CQUFtQixDQUFDLENBQUE7QUFDM0MseUJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFFakQsc0JBQXlDLG9CQUFvQixDQUFDLENBQUE7QUFDOUQsd0JBQXdCLG9CQUFvQixDQUFDLENBQUE7QUFDN0Msc0JBQW1DLFNBQVMsQ0FBQyxDQUFBO0FBOEQ3QztJQUE2QiwyQkFBK0M7SUFBNUU7UUFBQSxpQkF1SEM7UUF2SDRCLDhCQUErQztRQXFCakUsVUFBSyxHQUFHO1lBQ1gsTUFBTSxFQUFFLEVBQXFCO1NBQ2hDLENBQUM7UUFFRixtREFBbUQ7UUFDM0MsWUFBTyxHQUFHLENBQUMsQ0FBQztRQW1GWixzQkFBaUIsR0FBRyxVQUFDLEtBQW9CLElBQUssT0FBQSxVQUFDLGNBQXVCO1lBQzFFLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUM1QyxDQUFDLEVBRnFELENBRXJELENBQUE7UUFFTyxnQkFBVyxHQUFHLFVBQUMsQ0FBbUM7WUFDdEQsb0ZBQW9GO1lBQ3BGLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssYUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDckIsS0FB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QUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBRSxHQUFHLENBQUM7SUFDMUUsQ0FBQztJQUVPLG9DQUFrQixHQUExQixVQUEyQixLQUFrQixFQUFFLEdBQStCO1FBQS9CLG1CQUErQixHQUEvQixpQkFBZSxJQUFJLENBQUMsT0FBTyxFQUFJO1FBQzFFLDRFQUE0RTtRQUM1RSxJQUFNLE9BQU8sR0FBRyxvQkFBWSxDQUFnQixLQUFLLENBQUMsQ0FBQztRQUNuRCxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ25CLENBQUM7SUFFTyxvQ0FBa0IsR0FBMUI7UUFDSSxJQUFNLFNBQVMsR0FBRyxtQkFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELHVFQUF1RTtRQUN2RSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUcsT0FBTyxDQUFDLGVBQWUsU0FBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUUsRUFBL0MsQ0FBK0MsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUExR2Esb0JBQVksR0FBa0I7UUFDeEMsU0FBUyxFQUFFLEtBQUs7UUFDaEIsaUJBQWlCLEVBQUUsSUFBSTtRQUN2QixNQUFNLEVBQUUsS0FBSztRQUNiLFFBQVEsRUFBRSxtQkFBUSxDQUFDLEdBQUc7S0FDekIsQ0FBQztJQVBOO1FBQUMsVUFBVTtlQUFBO0lBd0hYLGNBQUM7QUFBRCxDQXZIQSxBQXVIQyxDQXZINEIscUNBQWlCLEdBdUg3QztBQXZIWSxlQUFPLFVBdUhuQixDQUFBIiwiZmlsZSI6ImNvbXBvbmVudHMvdG9hc3QvdG9hc3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUHVyZVJlbmRlciBmcm9tIFwicHVyZS1yZW5kZXItZGVjb3JhdG9yXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcblxuaW1wb3J0IHsgQWJzdHJhY3RDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2Fic3RyYWN0Q29tcG9uZW50XCI7XG5pbXBvcnQgKiBhcyBDbGFzc2VzIGZyb20gXCIuLi8uLi9jb21tb24vY2xhc3Nlc1wiO1xuaW1wb3J0IHsgVE9BU1RFUl9JTkxJTkVfV0FSTklORyB9IGZyb20gXCIuLi8uLi9jb21tb24vZXJyb3JzXCI7XG5pbXBvcnQgeyBFU0NBUEUgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2tleXNcIjtcbmltcG9ydCB7IFBvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wb3NpdGlvblwiO1xuaW1wb3J0IHsgSVByb3BzIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9wcm9wc1wiO1xuaW1wb3J0IHsgc2FmZUludm9rZSwgc2hhbGxvd0Nsb25lIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi91dGlsc1wiO1xuaW1wb3J0IHsgT3ZlcmxheSB9IGZyb20gXCIuLi9vdmVybGF5L292ZXJsYXlcIjtcbmltcG9ydCB7IElUb2FzdFByb3BzLCBUb2FzdCB9IGZyb20gXCIuL3RvYXN0XCI7XG5cbmV4cG9ydCB0eXBlIElUb2FzdE9wdGlvbnMgPSBJVG9hc3RQcm9wcyAmIHtrZXk/OiBzdHJpbmd9O1xuXG5leHBvcnQgaW50ZXJmYWNlIElUb2FzdGVyIHtcbiAgICAvKiogU2hvdyBhIG5ldyB0b2FzdCB0byB0aGUgdXNlci4gUmV0dXJucyB0aGUgdW5pcXVlIGtleSBvZiB0aGUgbmV3IHRvYXN0LiAqL1xuICAgIHNob3cocHJvcHM6IElUb2FzdFByb3BzKTogc3RyaW5nO1xuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgdG9hc3Qgd2l0aCB0aGUgZ2l2ZW4ga2V5IHRvIHVzZSB0aGUgbmV3IHByb3BzLlxuICAgICAqIFVwZGF0aW5nIGEga2V5IHRoYXQgZG9lcyBub3QgZXhpc3QgaXMgZWZmZWN0aXZlbHkgYSBuby1vcC5cbiAgICAgKi9cbiAgICB1cGRhdGUoa2V5OiBzdHJpbmcsIHByb3BzOiBJVG9hc3RQcm9wcyk6IHZvaWQ7XG5cbiAgICAvKiogRGlzbWlzcyB0aGUgZ2l2ZW4gdG9hc3QgaW5zdGFudGx5LiAqL1xuICAgIGRpc21pc3Moa2V5OiBzdHJpbmcpOiB2b2lkO1xuXG4gICAgLyoqIERpc21pc3MgYWxsIHRvYXN0cyBpbnN0YW50bHkuICovXG4gICAgY2xlYXIoKTogdm9pZDtcblxuICAgIC8qKiBSZXR1cm5zIHRoZSBwcm9wcyBmb3IgYWxsIGN1cnJlbnQgdG9hc3RzLiAqL1xuICAgIGdldFRvYXN0cygpOiBJVG9hc3RPcHRpb25zW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRvYXN0ZXJQcm9wcyBleHRlbmRzIElQcm9wcyB7XG4gICAgLyoqXG4gICAgICogV2hldGhlciBhIHRvYXN0IHNob3VsZCBhY3F1aXJlIGFwcGxpY2F0aW9uIGZvY3VzIHdoZW4gaXQgZmlyc3Qgb3BlbnMuXG4gICAgICogVGhpcyBpcyBkaXNhYmxlZCBieSBkZWZhdWx0IHNvIHRoYXQgdG9hc3RzIGRvIG5vdCBpbnRlcnJ1cHQgdGhlIHVzZXIncyBmbG93LlxuICAgICAqIE5vdGUgdGhhdCBgZW5mb3JjZUZvY3VzYCBpcyBhbHdheXMgZGlzYWJsZWQgZm9yIGBUb2FzdGVyYHMuXG4gICAgICogQGRlZmF1bHQgZmFsc2VcbiAgICAgKi9cbiAgICBhdXRvRm9jdXM/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciBwcmVzc2luZyB0aGUgYGVzY2Aga2V5IHNob3VsZCBjbGVhciBhbGwgYWN0aXZlIHRvYXN0cy5cbiAgICAgKiBAZGVmYXVsdCB0cnVlXG4gICAgICovXG4gICAgY2FuRXNjYXBlS2V5Q2xlYXI/OiBib29sZWFuO1xuXG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgdG9hc3RlciBzaG91bGQgYmUgcmVuZGVyZWQgaW5saW5lIG9yIGludG8gYSBuZXcgZWxlbWVudCBvbiBgZG9jdW1lbnQuYm9keWAuXG4gICAgICogSWYgYHRydWVgLCB0aGVuIHBvc2l0aW9uaW5nIHdpbGwgYmUgcmVsYXRpdmUgdG8gdGhlIHBhcmVudCBlbGVtZW50LlxuICAgICAqXG4gICAgICogVGhpcyBwcm9wIGlzIGlnbm9yZWQgYnkgYFRvYXN0ZXIuY3JlYXRlKClgIGFzIHRoYXQgbWV0aG9kIGFsd2F5cyBhcHBlbmRzIGEgbmV3IGVsZW1lbnRcbiAgICAgKiB0byB0aGUgY29udGFpbmVyLlxuICAgICAqIEBkZWZhdWx0IGZhbHNlXG4gICAgICovXG4gICAgaW5saW5lPzogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIG9mIGBUb2FzdGVyYCB3aXRoaW4gaXRzIGNvbnRhaW5lci4gTm90ZSB0aGF0IGBMRUZUYCBhbmQgYFJJR0hUYCBhcmUgZGlzYWxsb3dlZFxuICAgICAqIGJlY2F1c2UgVG9hc3RlciBvbmx5IHN1cHBvcnRzIHRoZSB0b3AgYW5kIGJvdHRvbSBlZGdlcy5cbiAgICAgKiBAZGVmYXVsdCBQb3NpdGlvbi5UT1BcbiAgICAgKi9cbiAgICBwb3NpdGlvbj86IFBvc2l0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUb2FzdGVyU3RhdGUge1xuICAgIHRvYXN0czogSVRvYXN0T3B0aW9uc1tdO1xufVxuXG5AUHVyZVJlbmRlclxuZXhwb3J0IGNsYXNzIFRvYXN0ZXIgZXh0ZW5kcyBBYnN0cmFjdENvbXBvbmVudDxJVG9hc3RlclByb3BzLCBJVG9hc3RlclN0YXRlPiBpbXBsZW1lbnRzIElUb2FzdGVyIHtcbiAgICBwdWJsaWMgc3RhdGljIGRlZmF1bHRQcm9wczogSVRvYXN0ZXJQcm9wcyA9IHtcbiAgICAgICAgYXV0b0ZvY3VzOiBmYWxzZSxcbiAgICAgICAgY2FuRXNjYXBlS2V5Q2xlYXI6IHRydWUsXG4gICAgICAgIGlubGluZTogZmFsc2UsXG4gICAgICAgIHBvc2l0aW9uOiBQb3NpdGlvbi5UT1AsXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBgVG9hc3RlcmAgaW5zdGFuY2UgdGhhdCBjYW4gYmUgc2hhcmVkIGFyb3VuZCB5b3VyIGFwcGxpY2F0aW9uLlxuICAgICAqIFRoZSBgVG9hc3RlcmAgd2lsbCBiZSByZW5kZXJlZCBpbnRvIGEgbmV3IGVsZW1lbnQgYXBwZW5kZWQgdG8gdGhlIGdpdmVuIGNvbnRhaW5lci5cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZShwcm9wcz86IElUb2FzdGVyUHJvcHMsIGNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHkpOiBJVG9hc3RlciB7XG4gICAgICAgIGlmIChwcm9wcyAhPSBudWxsICYmIHByb3BzLmlubGluZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oVE9BU1RFUl9JTkxJTkVfV0FSTklORyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29udGFpbmVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJFbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIFJlYWN0RE9NLnJlbmRlcig8VG9hc3RlciB7Li4ucHJvcHN9IGlubGluZSAvPiAsIGNvbnRhaW5lckVsZW1lbnQpIGFzIFRvYXN0ZXI7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRlID0ge1xuICAgICAgICB0b2FzdHM6IFtdIGFzIElUb2FzdE9wdGlvbnNbXSxcbiAgICB9O1xuXG4gICAgLy8gYXV0by1pbmNyZW1lbnRpbmcgaWRlbnRpZmllciBmb3IgdW4ta2V5ZWQgdG9hc3RzXG4gICAgcHJpdmF0ZSB0b2FzdElkID0gMDtcblxuICAgIHB1YmxpYyBzaG93KHByb3BzOiBJVG9hc3RQcm9wcykge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jcmVhdGVUb2FzdE9wdGlvbnMocHJvcHMpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKChwcmV2U3RhdGUpID0+ICh7XG4gICAgICAgICAgICB0b2FzdHM6IFtvcHRpb25zLCAuLi5wcmV2U3RhdGUudG9hc3RzXSxcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5rZXk7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZShrZXk6IHN0cmluZywgcHJvcHM6IElUb2FzdFByb3BzKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmNyZWF0ZVRvYXN0T3B0aW9ucyhwcm9wcywga2V5KTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgocHJldlN0YXRlKSA9PiAoe1xuICAgICAgICAgICAgdG9hc3RzOiBwcmV2U3RhdGUudG9hc3RzLm1hcCgodCkgPT4gdC5rZXkgPT09IGtleSA/IG9wdGlvbnMgOiB0KSxcbiAgICAgICAgfSkpO1xuICAgIH1cblxuICAgIHB1YmxpYyBkaXNtaXNzKGtleTogc3RyaW5nLCB0aW1lb3V0RXhwaXJlZCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoKHsgdG9hc3RzIH0pID0+ICh7XG4gICAgICAgICAgICB0b2FzdHM6IHRvYXN0cy5maWx0ZXIoKHQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaGVzS2V5ID0gdC5rZXkgPT09IGtleTtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hlc0tleSkge1xuICAgICAgICAgICAgICAgICAgICBzYWZlSW52b2tlKHQub25EaXNtaXNzLCB0aW1lb3V0RXhwaXJlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAhbWF0Y2hlc0tleTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9KSk7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyKCkge1xuICAgICAgICB0aGlzLnN0YXRlLnRvYXN0cy5tYXAoKHQpID0+IHNhZmVJbnZva2UodC5vbkRpc21pc3MsIGZhbHNlKSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB0b2FzdHM6IFtdIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRUb2FzdHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnRvYXN0cztcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICAvLyAkcHQtdHJhbnNpdGlvbi1kdXJhdGlvbiAqIDMgKyAkcHQtdHJhbnNpdGlvbi1kdXJhdGlvbiAvIDJcbiAgICAgICAgY29uc3QgY2xhc3NlcyA9IGNsYXNzTmFtZXMoQ2xhc3Nlcy5UT0FTVF9DT05UQUlORVIsIHRoaXMuZ2V0UG9zaXRpb25DbGFzc2VzKCksIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxPdmVybGF5XG4gICAgICAgICAgICAgICAgYXV0b0ZvY3VzPXt0aGlzLnByb3BzLmF1dG9Gb2N1c31cbiAgICAgICAgICAgICAgICBjYW5Fc2NhcGVLZXlDbG9zZT17dGhpcy5wcm9wcy5jYW5Fc2NhcGVLZXlDbGVhcn1cbiAgICAgICAgICAgICAgICBjYW5PdXRzaWRlQ2xpY2tDbG9zZT17ZmFsc2V9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzfVxuICAgICAgICAgICAgICAgIGVuZm9yY2VGb2N1cz17ZmFsc2V9XG4gICAgICAgICAgICAgICAgaGFzQmFja2Ryb3A9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIGlubGluZT17dGhpcy5wcm9wcy5pbmxpbmV9XG4gICAgICAgICAgICAgICAgaXNPcGVuPXt0aGlzLnN0YXRlLnRvYXN0cy5sZW5ndGggPiAwfVxuICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMuaGFuZGxlQ2xvc2V9XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uPXszNTB9XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbk5hbWU9XCJwdC10b2FzdFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUudG9hc3RzLm1hcCh0aGlzLnJlbmRlclRvYXN0LCB0aGlzKX1cbiAgICAgICAgICAgIDwvT3ZlcmxheT5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdmFsaWRhdGVQcm9wcyhwcm9wczogSVRvYXN0ZXJQcm9wcykge1xuICAgICAgICBpZiAocHJvcHMucG9zaXRpb24gPT09IFBvc2l0aW9uLkxFRlQgfHwgcHJvcHMucG9zaXRpb24gPT09IFBvc2l0aW9uLlJJR0hUKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUb2FzdGVyIGRvZXMgbm90IHN1cHBvcnQgTEVGVCBvciBSSUdIVCBwb3NpdGlvbnMuXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJUb2FzdCh0b2FzdDogSVRvYXN0T3B0aW9ucykge1xuICAgICAgICByZXR1cm4gPFRvYXN0IHsuLi50b2FzdH0gb25EaXNtaXNzPXt0aGlzLmdldERpc21pc3NIYW5kbGVyKHRvYXN0KX0gLz47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVUb2FzdE9wdGlvbnMocHJvcHM6IElUb2FzdFByb3BzLCBrZXkgPSBgdG9hc3QtJHt0aGlzLnRvYXN0SWQrK31gKSB7XG4gICAgICAgIC8vIGNsb25lIHRoZSBvYmplY3QgYmVmb3JlIGFkZGluZyB0aGUga2V5IHByb3AgdG8gYXZvaWQgbGVha2luZyB0aGUgbXV0YXRpb25cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHNoYWxsb3dDbG9uZTxJVG9hc3RPcHRpb25zPihwcm9wcyk7XG4gICAgICAgIG9wdGlvbnMua2V5ID0ga2V5O1xuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBvc2l0aW9uQ2xhc3NlcygpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb25zID0gUG9zaXRpb25bdGhpcy5wcm9wcy5wb3NpdGlvbl0uc3BsaXQoXCJfXCIpO1xuICAgICAgICAvLyBOT1RFIHRoYXQgdGhlcmUgaXMgbm8gLWNlbnRlciBjbGFzcyBiZWNhdXNlIHRoYXQncyB0aGUgZGVmYXVsdCBzdHlsZVxuICAgICAgICByZXR1cm4gcG9zaXRpb25zLm1hcCgocCkgPT4gYCR7Q2xhc3Nlcy5UT0FTVF9DT05UQUlORVJ9LSR7cC50b0xvd2VyQ2FzZSgpfWApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGlzbWlzc0hhbmRsZXIgPSAodG9hc3Q6IElUb2FzdE9wdGlvbnMpID0+ICh0aW1lb3V0RXhwaXJlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICB0aGlzLmRpc21pc3ModG9hc3Qua2V5LCB0aW1lb3V0RXhwaXJlZCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYW5kbGVDbG9zZSA9IChlOiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxFbGVtZW50PikgPT4ge1xuICAgICAgICAvLyBOT1RFIHRoYXQgYGVgIGlzbid0IGFsd2F5cyBhIEtleWJvYXJkRXZlbnQgYnV0IHRoYXQncyB0aGUgb25seSB0eXBlIHdlIGNhcmUgYWJvdXRcbiAgICAgICAgaWYgKGUud2hpY2ggPT09IEVTQ0FQRSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
