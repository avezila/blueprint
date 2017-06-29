/**
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var index_1 = require("../common/index");
var resizable_1 = require("../interactions/resizable");
var resizeHandle_1 = require("../interactions/resizeHandle");
var selectable_1 = require("../interactions/selectable");
var regions_1 = require("../regions");
var columnHeaderCell_1 = require("./columnHeaderCell");
var ColumnHeader = (function (_super) {
    __extends(ColumnHeader, _super);
    function ColumnHeader() {
        var _this = this;
        _super.apply(this, arguments);
        this.renderGhostCell = function (columnIndex, extremaClasses) {
            var grid = _this.props.grid;
            var rect = grid.getGhostCellRect(0, columnIndex);
            var style = {
                flexBasis: rect.width + "px",
                width: rect.width + "px",
            };
            return (React.createElement(columnHeaderCell_1.ColumnHeaderCell, {key: "bp-table-col-" + columnIndex, className: classNames(extremaClasses), style: style}));
        };
        this.renderCell = function (columnIndex, extremaClasses) {
            var _a = _this.props, allowMultipleSelection = _a.allowMultipleSelection, cellRenderer = _a.cellRenderer, grid = _a.grid, isResizable = _a.isResizable, maxColumnWidth = _a.maxColumnWidth, minColumnWidth = _a.minColumnWidth, onColumnWidthChanged = _a.onColumnWidthChanged, onLayoutLock = _a.onLayoutLock, onResizeGuide = _a.onResizeGuide, onSelection = _a.onSelection, selectedRegions = _a.selectedRegions, selectedRegionTransform = _a.selectedRegionTransform;
            var rect = grid.getColumnRect(columnIndex);
            var handleSizeChanged = function (size) {
                onResizeGuide([rect.left + size + 1]);
            };
            var handleResizeEnd = function (size) {
                onResizeGuide(null);
                onColumnWidthChanged(columnIndex, size);
            };
            var handleDoubleClick = function () {
                var width = _this.props.locator.getWidestVisibleCellInColumn(columnIndex);
                var clampedWidth = index_1.Utils.clamp(width, minColumnWidth, maxColumnWidth);
                onResizeGuide(null);
                onColumnWidthChanged(columnIndex, clampedWidth);
            };
            var cell = cellRenderer(columnIndex);
            var className = classNames(cell.props.className, extremaClasses, {
                "bp-table-draggable": (onSelection != null),
            });
            var isColumnSelected = regions_1.Regions.hasFullColumn(selectedRegions, columnIndex);
            return (React.createElement(selectable_1.DragSelectable, {allowMultipleSelection: allowMultipleSelection, key: "bp-table-col-" + columnIndex, locateClick: _this.locateClick, locateDrag: _this.locateDrag, onSelection: onSelection, selectedRegions: selectedRegions, selectedRegionTransform: selectedRegionTransform}, 
                React.createElement(resizable_1.Resizable, {isResizable: isResizable, maxSize: maxColumnWidth, minSize: minColumnWidth, onDoubleClick: handleDoubleClick, onLayoutLock: onLayoutLock, onResizeEnd: handleResizeEnd, onSizeChanged: handleSizeChanged, orientation: resizeHandle_1.Orientation.VERTICAL, size: rect.width}, React.cloneElement(cell, { className: className, isColumnSelected: isColumnSelected }))
            ));
        };
        this.locateClick = function (event) {
            // Abort selection unless the mouse actually hit a table header. This allows
            // users to supply interactive components in their renderHeader methods.
            if (!columnHeaderCell_1.ColumnHeaderCell.isHeaderMouseTarget(event.target)) {
                return null;
            }
            var col = _this.props.locator.convertPointToColumn(event.clientX);
            return regions_1.Regions.column(col);
        };
        this.locateDrag = function (_event, coords) {
            var colStart = _this.props.locator.convertPointToColumn(coords.activation[0]);
            var colEnd = _this.props.locator.convertPointToColumn(coords.current[0]);
            return regions_1.Regions.column(colStart, colEnd);
        };
    }
    ColumnHeader.prototype.render = function () {
        var _a = this.props, grid = _a.grid, viewportRect = _a.viewportRect, columnIndexStart = _a.columnIndexStart, columnIndexEnd = _a.columnIndexEnd;
        var cells = [];
        for (var columnIndex = columnIndexStart; columnIndex <= columnIndexEnd; columnIndex++) {
            var extremaClasses = grid.getExtremaClasses(0, columnIndex, 1, columnIndexEnd);
            var renderer = grid.isGhostIndex(-1, columnIndex) ? this.renderGhostCell : this.renderCell;
            cells.push(renderer(columnIndex, extremaClasses));
        }
        // always set width so that the layout can push out the element unless it overflows.
        var style = {
            width: grid.getRect().width + "px",
        };
        // use CSS translation to offset the cells
        if (viewportRect != null) {
            style.transform = "translate3d(" + (grid.getColumnRect(columnIndexStart).left - viewportRect.left) + "px, 0, 0)";
        }
        var classes = classNames("bp-table-thead", "bp-table-column-header-tr", {
            "bp-table-draggable": (this.props.onSelection != null),
        });
        return React.createElement("div", {style: style, className: classes}, cells);
    };
    ColumnHeader.defaultProps = {
        isResizable: true,
    };
    ColumnHeader = __decorate([
        PureRender
    ], ColumnHeader);
    return ColumnHeader;
}(React.Component));
exports.ColumnHeader = ColumnHeader;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9oZWFkZXJzL2NvbHVtbkhlYWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0dBS0c7Ozs7Ozs7Ozs7Ozs7QUFFSCxJQUFZLFVBQVUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUN6QyxJQUFZLFVBQVUsV0FBTSx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3BELElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBRS9CLHNCQUE0QixpQkFBaUIsQ0FBQyxDQUFBO0FBRTlDLDBCQUFrRCwyQkFBMkIsQ0FBQyxDQUFBO0FBQzlFLDZCQUE2Qyw4QkFBOEIsQ0FBQyxDQUFBO0FBQzVFLDJCQUFpRCw0QkFBNEIsQ0FBQyxDQUFBO0FBRTlFLHdCQUF3QixZQUFZLENBQUMsQ0FBQTtBQUNyQyxpQ0FBZ0Ysb0JBQW9CLENBQUMsQ0FBQTtBQXNEckc7SUFBa0MsZ0NBQXVDO0lBQXpFO1FBQUEsaUJBZ0lDO1FBaElpQyw4QkFBdUM7UUErQjdELG9CQUFlLEdBQUcsVUFBQyxXQUFtQixFQUFFLGNBQXdCO1lBQzVELDJCQUFJLENBQWdCO1lBQzVCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDbkQsSUFBTSxLQUFLLEdBQUc7Z0JBQ1YsU0FBUyxFQUFLLElBQUksQ0FBQyxLQUFLLE9BQUk7Z0JBQzVCLEtBQUssRUFBSyxJQUFJLENBQUMsS0FBSyxPQUFJO2FBQzNCLENBQUM7WUFDRixNQUFNLENBQUMsQ0FDSCxvQkFBQyxtQ0FBZ0IsR0FDYixHQUFHLEVBQUUsa0JBQWdCLFdBQWMsRUFDbkMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxjQUFjLENBQUUsRUFDdEMsS0FBSyxFQUFFLEtBQU0sRUFDZixDQUFDLENBQUM7UUFDWixDQUFDLENBQUE7UUFFTyxlQUFVLEdBQUcsVUFBQyxXQUFtQixFQUFFLGNBQXdCO1lBQy9ELElBQUEsZ0JBYWMsRUFaVixrREFBc0IsRUFDdEIsOEJBQVksRUFDWixjQUFJLEVBQ0osNEJBQVcsRUFDWCxrQ0FBYyxFQUNkLGtDQUFjLEVBQ2QsOENBQW9CLEVBQ3BCLDhCQUFZLEVBQ1osZ0NBQWEsRUFDYiw0QkFBVyxFQUNYLG9DQUFlLEVBQ2Ysb0RBQXVCLENBQ1o7WUFFZixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdDLElBQU0saUJBQWlCLEdBQUcsVUFBQyxJQUFZO2dCQUNuQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQztZQUVGLElBQU0sZUFBZSxHQUFHLFVBQUMsSUFBWTtnQkFDakMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQixvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDNUMsQ0FBQyxDQUFDO1lBRUYsSUFBTSxpQkFBaUIsR0FBRztnQkFDdEIsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzNFLElBQU0sWUFBWSxHQUFHLGFBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDeEUsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQixvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDcEQsQ0FBQyxDQUFDO1lBRUYsSUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZDLElBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxjQUFjLEVBQUU7Z0JBQy9ELG9CQUFvQixFQUFFLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQzthQUM5QyxDQUFDLENBQUM7WUFDSCxJQUFNLGdCQUFnQixHQUFHLGlCQUFPLENBQUMsYUFBYSxDQUFDLGVBQWUsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUU3RSxNQUFNLENBQUMsQ0FDSCxvQkFBQywyQkFBYyxHQUNYLHNCQUFzQixFQUFFLHNCQUF1QixFQUMvQyxHQUFHLEVBQUUsa0JBQWdCLFdBQWMsRUFDbkMsV0FBVyxFQUFFLEtBQUksQ0FBQyxXQUFZLEVBQzlCLFVBQVUsRUFBRSxLQUFJLENBQUMsVUFBVyxFQUM1QixXQUFXLEVBQUUsV0FBWSxFQUN6QixlQUFlLEVBQUUsZUFBZ0IsRUFDakMsdUJBQXVCLEVBQUUsdUJBQXdCO2dCQUVqRCxvQkFBQyxxQkFBUyxHQUNOLFdBQVcsRUFBRSxXQUFZLEVBQ3pCLE9BQU8sRUFBRSxjQUFlLEVBQ3hCLE9BQU8sRUFBRSxjQUFlLEVBQ3hCLGFBQWEsRUFBRSxpQkFBa0IsRUFDakMsWUFBWSxFQUFFLFlBQWEsRUFDM0IsV0FBVyxFQUFFLGVBQWdCLEVBQzdCLGFBQWEsRUFBRSxpQkFBa0IsRUFDakMsV0FBVyxFQUFFLDBCQUFXLENBQUMsUUFBUyxFQUNsQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQU0sR0FFaEIsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsRUFBRSxvQkFBUyxFQUFFLGtDQUFnQixFQUE0QixDQUFFLENBQzdFO2FBQ0MsQ0FDcEIsQ0FBQztRQUNOLENBQUMsQ0FBQTtRQUVPLGdCQUFXLEdBQUcsVUFBQyxLQUFpQjtZQUNwQyw0RUFBNEU7WUFDNUUsd0VBQXdFO1lBQ3hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUNBQWdCLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE1BQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDaEIsQ0FBQztZQUVELElBQU0sR0FBRyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuRSxNQUFNLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFBO1FBRU8sZUFBVSxHQUFHLFVBQUMsTUFBa0IsRUFBRSxNQUF1QjtZQUM3RCxJQUFNLFFBQVEsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0UsSUFBTSxNQUFNLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFFLE1BQU0sQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQTNIVSw2QkFBTSxHQUFiO1FBQ0ksSUFBQSxlQUEyRSxFQUFuRSxjQUFJLEVBQUUsOEJBQVksRUFBRSxzQ0FBZ0IsRUFBRSxrQ0FBYyxDQUFnQjtRQUM1RSxJQUFNLEtBQUssR0FBbUMsRUFBRSxDQUFDO1FBQ2pELEdBQUcsQ0FBQyxDQUFDLElBQUksV0FBVyxHQUFHLGdCQUFnQixFQUFFLFdBQVcsSUFBSSxjQUFjLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQztZQUNwRixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDakYsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDN0YsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUVELG9GQUFvRjtRQUNwRixJQUFNLEtBQUssR0FBd0I7WUFDL0IsS0FBSyxFQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLE9BQUk7U0FDckMsQ0FBQztRQUVGLDBDQUEwQztRQUMxQyxFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2QixLQUFLLENBQUMsU0FBUyxHQUFHLGtCQUFlLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksZUFBVyxDQUFDO1FBQzlHLENBQUM7UUFFRCxJQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsMkJBQTJCLEVBQUU7WUFDdEUsb0JBQW9CLEVBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUM7U0FDMUQsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLHFCQUFDLEdBQUcsSUFBQyxLQUFLLEVBQUUsS0FBTSxFQUFDLFNBQVMsRUFBRSxPQUFRLEdBQUUsS0FBTSxDQUFNLENBQUM7SUFDaEUsQ0FBQztJQTVCYSx5QkFBWSxHQUFHO1FBQ3pCLFdBQVcsRUFBRSxJQUFJO0tBQ3BCLENBQUM7SUFKTjtRQUFDLFVBQVU7b0JBQUE7SUFpSVgsbUJBQUM7QUFBRCxDQWhJQSxBQWdJQyxDQWhJaUMsS0FBSyxDQUFDLFNBQVMsR0FnSWhEO0FBaElZLG9CQUFZLGVBZ0l4QixDQUFBIiwiZmlsZSI6ImhlYWRlcnMvY29sdW1uSGVhZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNiBQYWxhbnRpciBUZWNobm9sb2dpZXMsIEluYy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBCU0QtMyBMaWNlbnNlIGFzIG1vZGlmaWVkICh0aGUg4oCcTGljZW5zZeKAnSk7IHlvdSBtYXkgb2J0YWluIGEgY29weVxuICogb2YgdGhlIGxpY2Vuc2UgYXQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKiBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3BhbGFudGlyL2JsdWVwcmludC9ibG9iL21hc3Rlci9QQVRFTlRTXG4gKi9cblxuaW1wb3J0ICogYXMgY2xhc3NOYW1lcyBmcm9tIFwiY2xhc3NuYW1lc1wiO1xuaW1wb3J0ICogYXMgUHVyZVJlbmRlciBmcm9tIFwicHVyZS1yZW5kZXItZGVjb3JhdG9yXCI7XG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEdyaWQsIElDb2x1bW5JbmRpY2VzIH0gZnJvbSBcIi4uL2NvbW1vbi9ncmlkXCI7XG5pbXBvcnQgeyBSZWN0LCBVdGlscyB9IGZyb20gXCIuLi9jb21tb24vaW5kZXhcIjtcbmltcG9ydCB7IElDb29yZGluYXRlRGF0YSB9IGZyb20gXCIuLi9pbnRlcmFjdGlvbnMvZHJhZ2dhYmxlXCI7XG5pbXBvcnQgeyBJSW5kZXhlZFJlc2l6ZUNhbGxiYWNrLCBSZXNpemFibGUgfSBmcm9tIFwiLi4vaW50ZXJhY3Rpb25zL3Jlc2l6YWJsZVwiO1xuaW1wb3J0IHsgSUxvY2thYmxlTGF5b3V0LCBPcmllbnRhdGlvbiB9IGZyb20gXCIuLi9pbnRlcmFjdGlvbnMvcmVzaXplSGFuZGxlXCI7XG5pbXBvcnQgeyBEcmFnU2VsZWN0YWJsZSwgSVNlbGVjdGFibGVQcm9wcyB9IGZyb20gXCIuLi9pbnRlcmFjdGlvbnMvc2VsZWN0YWJsZVwiO1xuaW1wb3J0IHsgSUxvY2F0b3IgfSBmcm9tIFwiLi4vbG9jYXRvclwiO1xuaW1wb3J0IHsgUmVnaW9ucyB9IGZyb20gXCIuLi9yZWdpb25zXCI7XG5pbXBvcnQgeyBDb2x1bW5IZWFkZXJDZWxsLCBJQ29sdW1uSGVhZGVyQ2VsbFByb3BzLCBJQ29sdW1uSGVhZGVyUmVuZGVyZXIgfSBmcm9tIFwiLi9jb2x1bW5IZWFkZXJDZWxsXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbHVtbldpZHRocyB7XG4gICAgbWluQ29sdW1uV2lkdGg/OiBudW1iZXI7XG4gICAgbWF4Q29sdW1uV2lkdGg/OiBudW1iZXI7XG4gICAgZGVmYXVsdENvbHVtbldpZHRoPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb2x1bW5IZWFkZXJQcm9wcyBleHRlbmRzIElTZWxlY3RhYmxlUHJvcHMsIElDb2x1bW5JbmRpY2VzLCBJQ29sdW1uV2lkdGhzLCBJTG9ja2FibGVMYXlvdXQge1xuICAgIC8qKlxuICAgICAqIEEgSUNvbHVtbkhlYWRlclJlbmRlcmVyIHRoYXQsIGZvciBlYWNoIGA8Q29sdW1uPmAsIHdpbGwgZGVsZWdhdGUgdG86XG4gICAgICogMS4gVGhlIGByZW5kZXJDb2x1bW5IZWFkZXJgIG1ldGhvZCBmcm9tIHRoZSBgPENvbHVtbj5gXG4gICAgICogMi4gQSBgPENvbHVtbkhlYWRlckNlbGw+YCB1c2luZyB0aGUgYG5hbWVgIHByb3AgZnJvbSB0aGUgYDxDb2x1bW4+YFxuICAgICAqIDMuIEEgYDxDb2x1bW5IZWFkZXJDZWxsPmAgd2l0aCBhIGBuYW1lYCBnZW5lcmF0ZWQgZnJvbSBgVXRpbHMudG9CYXNlMjZBbHBoYWBcbiAgICAgKi9cbiAgICBjZWxsUmVuZGVyZXI6IElDb2x1bW5IZWFkZXJSZW5kZXJlcjtcblxuICAgIC8qKlxuICAgICAqIFRoZSBncmlkIGNvbXB1dGVzIHNpemVzIG9mIGNlbGxzLCByb3dzLCBvciBjb2x1bW5zIGZyb20gdGhlXG4gICAgICogY29uZmlndXJhYmxlIGBjb2x1bW5XaWR0aHNgIGFuZCBgcm93SGVpZ2h0c2AuXG4gICAgICovXG4gICAgZ3JpZDogR3JpZDtcblxuICAgIC8qKlxuICAgICAqIExvY2F0ZXMgdGhlIHJvdy9jb2x1bW4vY2VsbCBnaXZlbiBhIG1vdXNlIGV2ZW50LlxuICAgICAqL1xuICAgIGxvY2F0b3I6IElMb2NhdG9yO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGBSZWN0YCBib3VuZHMgb2YgdGhlIHZpc2libGUgdmlld3BvcnQgd2l0aCByZXNwZWN0IHRvIGl0cyBwYXJlbnRcbiAgICAgKiBzY3JvbGxhYmxlIHBhbmUuXG4gICAgICovXG4gICAgdmlld3BvcnRSZWN0OiBSZWN0O1xuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcy9kaXNhYmxlcyB0aGUgcmVzaXplIGludGVyYWN0aW9uLlxuICAgICAqIEBkZWZhdWx0IHRydWVcbiAgICAgKi9cbiAgICBpc1Jlc2l6YWJsZT86IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBBIGNhbGxiYWNrIGludm9rZWQgd2hlbiB1c2VyIGlzIGRvbmUgcmVzaXppbmcgdGhlIGNvbHVtblxuICAgICAqL1xuICAgIG9uQ29sdW1uV2lkdGhDaGFuZ2VkOiBJSW5kZXhlZFJlc2l6ZUNhbGxiYWNrO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBjYWxsYmFjayBpcyBjYWxsZWQgd2hpbGUgdGhlIHVzZXIgaXMgcmVzaXppbmcgYSBjb2x1bW4uIFRoZSBndWlkZXNcbiAgICAgKiBhcnJheSBjb250YWlucyBwaXhlbCBvZmZzZXRzIGZvciB3aGVyZSB0byBkaXNwbGF5IHRoZSByZXNpemUgZ3VpZGVzIGluXG4gICAgICogdGhlIHRhYmxlIGJvZHkncyBvdmVybGF5IGxheWVyLlxuICAgICAqL1xuICAgIG9uUmVzaXplR3VpZGU6IChndWlkZXM6IG51bWJlcltdKSA9PiB2b2lkO1xufVxuXG5AUHVyZVJlbmRlclxuZXhwb3J0IGNsYXNzIENvbHVtbkhlYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxJQ29sdW1uSGVhZGVyUHJvcHMsIHt9PiB7XG4gICAgcHVibGljIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgICAgIGlzUmVzaXphYmxlOiB0cnVlLFxuICAgIH07XG5cbiAgICBwdWJsaWMgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCB7IGdyaWQsIHZpZXdwb3J0UmVjdCwgY29sdW1uSW5kZXhTdGFydCwgY29sdW1uSW5kZXhFbmQgfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGNlbGxzOiBBcnJheTxSZWFjdC5SZWFjdEVsZW1lbnQ8YW55Pj4gPSBbXTtcbiAgICAgICAgZm9yIChsZXQgY29sdW1uSW5kZXggPSBjb2x1bW5JbmRleFN0YXJ0OyBjb2x1bW5JbmRleCA8PSBjb2x1bW5JbmRleEVuZDsgY29sdW1uSW5kZXgrKykge1xuICAgICAgICAgICAgY29uc3QgZXh0cmVtYUNsYXNzZXMgPSBncmlkLmdldEV4dHJlbWFDbGFzc2VzKDAsIGNvbHVtbkluZGV4LCAxLCBjb2x1bW5JbmRleEVuZCk7XG4gICAgICAgICAgICBjb25zdCByZW5kZXJlciA9IGdyaWQuaXNHaG9zdEluZGV4KC0xLCBjb2x1bW5JbmRleCkgPyB0aGlzLnJlbmRlckdob3N0Q2VsbCA6IHRoaXMucmVuZGVyQ2VsbDtcbiAgICAgICAgICAgIGNlbGxzLnB1c2gocmVuZGVyZXIoY29sdW1uSW5kZXgsIGV4dHJlbWFDbGFzc2VzKSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbHdheXMgc2V0IHdpZHRoIHNvIHRoYXQgdGhlIGxheW91dCBjYW4gcHVzaCBvdXQgdGhlIGVsZW1lbnQgdW5sZXNzIGl0IG92ZXJmbG93cy5cbiAgICAgICAgY29uc3Qgc3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XG4gICAgICAgICAgICB3aWR0aDogYCR7Z3JpZC5nZXRSZWN0KCkud2lkdGh9cHhgLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIHVzZSBDU1MgdHJhbnNsYXRpb24gdG8gb2Zmc2V0IHRoZSBjZWxsc1xuICAgICAgICBpZiAodmlld3BvcnRSZWN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke2dyaWQuZ2V0Q29sdW1uUmVjdChjb2x1bW5JbmRleFN0YXJ0KS5sZWZ0IC0gdmlld3BvcnRSZWN0LmxlZnR9cHgsIDAsIDApYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNsYXNzZXMgPSBjbGFzc05hbWVzKFwiYnAtdGFibGUtdGhlYWRcIiwgXCJicC10YWJsZS1jb2x1bW4taGVhZGVyLXRyXCIsIHtcbiAgICAgICAgICAgIFwiYnAtdGFibGUtZHJhZ2dhYmxlXCIgOiAodGhpcy5wcm9wcy5vblNlbGVjdGlvbiAhPSBudWxsKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3N0eWxlfSBjbGFzc05hbWU9e2NsYXNzZXN9PntjZWxsc308L2Rpdj47XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZW5kZXJHaG9zdENlbGwgPSAoY29sdW1uSW5kZXg6IG51bWJlciwgZXh0cmVtYUNsYXNzZXM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgZ3JpZCB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgcmVjdCA9IGdyaWQuZ2V0R2hvc3RDZWxsUmVjdCgwLCBjb2x1bW5JbmRleCk7XG4gICAgICAgIGNvbnN0IHN0eWxlID0ge1xuICAgICAgICAgICAgZmxleEJhc2lzOiBgJHtyZWN0LndpZHRofXB4YCxcbiAgICAgICAgICAgIHdpZHRoOiBgJHtyZWN0LndpZHRofXB4YCxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxDb2x1bW5IZWFkZXJDZWxsXG4gICAgICAgICAgICAgICAga2V5PXtgYnAtdGFibGUtY29sLSR7Y29sdW1uSW5kZXh9YH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoZXh0cmVtYUNsYXNzZXMpfVxuICAgICAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cbiAgICAgICAgICAgIC8+KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHJlbmRlckNlbGwgPSAoY29sdW1uSW5kZXg6IG51bWJlciwgZXh0cmVtYUNsYXNzZXM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGFsbG93TXVsdGlwbGVTZWxlY3Rpb24sXG4gICAgICAgICAgICBjZWxsUmVuZGVyZXIsXG4gICAgICAgICAgICBncmlkLFxuICAgICAgICAgICAgaXNSZXNpemFibGUsXG4gICAgICAgICAgICBtYXhDb2x1bW5XaWR0aCxcbiAgICAgICAgICAgIG1pbkNvbHVtbldpZHRoLFxuICAgICAgICAgICAgb25Db2x1bW5XaWR0aENoYW5nZWQsXG4gICAgICAgICAgICBvbkxheW91dExvY2ssXG4gICAgICAgICAgICBvblJlc2l6ZUd1aWRlLFxuICAgICAgICAgICAgb25TZWxlY3Rpb24sXG4gICAgICAgICAgICBzZWxlY3RlZFJlZ2lvbnMsXG4gICAgICAgICAgICBzZWxlY3RlZFJlZ2lvblRyYW5zZm9ybSxcbiAgICAgICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgY29uc3QgcmVjdCA9IGdyaWQuZ2V0Q29sdW1uUmVjdChjb2x1bW5JbmRleCk7XG4gICAgICAgIGNvbnN0IGhhbmRsZVNpemVDaGFuZ2VkID0gKHNpemU6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgb25SZXNpemVHdWlkZShbcmVjdC5sZWZ0ICsgc2l6ZSArIDFdKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBoYW5kbGVSZXNpemVFbmQgPSAoc2l6ZTogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICBvblJlc2l6ZUd1aWRlKG51bGwpO1xuICAgICAgICAgICAgb25Db2x1bW5XaWR0aENoYW5nZWQoY29sdW1uSW5kZXgsIHNpemUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGhhbmRsZURvdWJsZUNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLnByb3BzLmxvY2F0b3IuZ2V0V2lkZXN0VmlzaWJsZUNlbGxJbkNvbHVtbihjb2x1bW5JbmRleCk7XG4gICAgICAgICAgICBjb25zdCBjbGFtcGVkV2lkdGggPSBVdGlscy5jbGFtcCh3aWR0aCwgbWluQ29sdW1uV2lkdGgsIG1heENvbHVtbldpZHRoKTtcbiAgICAgICAgICAgIG9uUmVzaXplR3VpZGUobnVsbCk7XG4gICAgICAgICAgICBvbkNvbHVtbldpZHRoQ2hhbmdlZChjb2x1bW5JbmRleCwgY2xhbXBlZFdpZHRoKTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjZWxsID0gY2VsbFJlbmRlcmVyKGNvbHVtbkluZGV4KTtcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gY2xhc3NOYW1lcyhjZWxsLnByb3BzLmNsYXNzTmFtZSwgZXh0cmVtYUNsYXNzZXMsIHtcbiAgICAgICAgICAgIFwiYnAtdGFibGUtZHJhZ2dhYmxlXCI6IChvblNlbGVjdGlvbiAhPSBudWxsKSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGlzQ29sdW1uU2VsZWN0ZWQgPSBSZWdpb25zLmhhc0Z1bGxDb2x1bW4oc2VsZWN0ZWRSZWdpb25zLCBjb2x1bW5JbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxEcmFnU2VsZWN0YWJsZVxuICAgICAgICAgICAgICAgIGFsbG93TXVsdGlwbGVTZWxlY3Rpb249e2FsbG93TXVsdGlwbGVTZWxlY3Rpb259XG4gICAgICAgICAgICAgICAga2V5PXtgYnAtdGFibGUtY29sLSR7Y29sdW1uSW5kZXh9YH1cbiAgICAgICAgICAgICAgICBsb2NhdGVDbGljaz17dGhpcy5sb2NhdGVDbGlja31cbiAgICAgICAgICAgICAgICBsb2NhdGVEcmFnPXt0aGlzLmxvY2F0ZURyYWd9XG4gICAgICAgICAgICAgICAgb25TZWxlY3Rpb249e29uU2VsZWN0aW9ufVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUmVnaW9ucz17c2VsZWN0ZWRSZWdpb25zfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkUmVnaW9uVHJhbnNmb3JtPXtzZWxlY3RlZFJlZ2lvblRyYW5zZm9ybX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8UmVzaXphYmxlXG4gICAgICAgICAgICAgICAgICAgIGlzUmVzaXphYmxlPXtpc1Jlc2l6YWJsZX1cbiAgICAgICAgICAgICAgICAgICAgbWF4U2l6ZT17bWF4Q29sdW1uV2lkdGh9XG4gICAgICAgICAgICAgICAgICAgIG1pblNpemU9e21pbkNvbHVtbldpZHRofVxuICAgICAgICAgICAgICAgICAgICBvbkRvdWJsZUNsaWNrPXtoYW5kbGVEb3VibGVDbGlja31cbiAgICAgICAgICAgICAgICAgICAgb25MYXlvdXRMb2NrPXtvbkxheW91dExvY2t9XG4gICAgICAgICAgICAgICAgICAgIG9uUmVzaXplRW5kPXtoYW5kbGVSZXNpemVFbmR9XG4gICAgICAgICAgICAgICAgICAgIG9uU2l6ZUNoYW5nZWQ9e2hhbmRsZVNpemVDaGFuZ2VkfVxuICAgICAgICAgICAgICAgICAgICBvcmllbnRhdGlvbj17T3JpZW50YXRpb24uVkVSVElDQUx9XG4gICAgICAgICAgICAgICAgICAgIHNpemU9e3JlY3Qud2lkdGh9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7UmVhY3QuY2xvbmVFbGVtZW50KGNlbGwsIHsgY2xhc3NOYW1lLCBpc0NvbHVtblNlbGVjdGVkIH0gYXMgSUNvbHVtbkhlYWRlckNlbGxQcm9wcyl9XG4gICAgICAgICAgICAgICAgPC9SZXNpemFibGU+XG4gICAgICAgICAgICA8L0RyYWdTZWxlY3RhYmxlPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9jYXRlQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgLy8gQWJvcnQgc2VsZWN0aW9uIHVubGVzcyB0aGUgbW91c2UgYWN0dWFsbHkgaGl0IGEgdGFibGUgaGVhZGVyLiBUaGlzIGFsbG93c1xuICAgICAgICAvLyB1c2VycyB0byBzdXBwbHkgaW50ZXJhY3RpdmUgY29tcG9uZW50cyBpbiB0aGVpciByZW5kZXJIZWFkZXIgbWV0aG9kcy5cbiAgICAgICAgaWYgKCFDb2x1bW5IZWFkZXJDZWxsLmlzSGVhZGVyTW91c2VUYXJnZXQoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb2wgPSB0aGlzLnByb3BzLmxvY2F0b3IuY29udmVydFBvaW50VG9Db2x1bW4oZXZlbnQuY2xpZW50WCk7XG4gICAgICAgIHJldHVybiBSZWdpb25zLmNvbHVtbihjb2wpO1xuICAgIH1cblxuICAgIHByaXZhdGUgbG9jYXRlRHJhZyA9IChfZXZlbnQ6IE1vdXNlRXZlbnQsIGNvb3JkczogSUNvb3JkaW5hdGVEYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbFN0YXJ0ID0gdGhpcy5wcm9wcy5sb2NhdG9yLmNvbnZlcnRQb2ludFRvQ29sdW1uKGNvb3Jkcy5hY3RpdmF0aW9uWzBdKTtcbiAgICAgICAgY29uc3QgY29sRW5kID0gdGhpcy5wcm9wcy5sb2NhdG9yLmNvbnZlcnRQb2ludFRvQ29sdW1uKGNvb3Jkcy5jdXJyZW50WzBdKTtcbiAgICAgICAgcmV0dXJuIFJlZ2lvbnMuY29sdW1uKGNvbFN0YXJ0LCBjb2xFbmQpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==