Sub Spread_Date_To_Tabs()
' this is a comment, not " or `
    ' Declare variables
    Dim cellRow As Variant
    
    Dim startDateCol As Variant
    Dim startDate As Variant
    Dim endDateCol As Variant
    Dim endDate As Variant
    Dim ongoingSheetName As Variant
    
    ' Populate constants
    ongoingSheetName = "Ongoing Medical Grants"
    startDateCol = "G"
    endDateCol = "H"
    
    ' Select currently active cell
    ActiveCell.Select
    ' may have to turn on "relative reference recording?" or something like this (not needed I think)
    ' ActiveCell.FormulaR1C1 = "uhhh test?"
    
    cellRow = ActiveCell.Row
    ' Note: .Value -> "11/1/2017 (Nov 1)", .Value2 => "43040" (overall time)
    ' Note2: .Text -> exact text in cell (Nov-17)
    startDate = ThisWorkbook.Worksheets(ongoingSheetName).Range(startDateCol & cellRow).Text
    endDate = ThisWorkbook.Worksheets(ongoingSheetName).Range(endDateCol & cellRow).Text
    
    ' TODO: get range of tabs to visit between startDate & endDate
    ' TODO: insert row from ongoingSheetName to new date tabs
    ' Get last empty row
    ' Cells(Rows.Count, 1).End(xlUp).Offset(1, 0).Select
    
    MsgBox ThisWorkbook.Worksheets(startDate).Range(startDateCol & cellRow).Text
    
End Sub

