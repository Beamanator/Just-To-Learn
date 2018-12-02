Sub Test_Module()
' this is a comment, not " or `
' Often 
    ' Declare variable to hold cell data (with date info)
    Dim cellData As Variant
    ' Select currently active cell
    ActiveCell.Select
    ' may have to turn on "relative reference recording?" or something like this (not needed I think)
    ActiveCell.FormulaR1C1 = "test? redness!!"
    
    myVariable = ActiveCell.Value2
    Debug.Print myVariable
    
    ' code from tutorial https://powerspreadsheets.com/excel-macro-tutorial-for-beginners/
    Selection.Columns.AutoFit
    With Selection.Interior
        .Pattern = xlSolid
        .PatternColorIndex = xlAutomatic
        .Color = 255
        .TintAndShade = 0
        .PatternTintAndShade = 0
    End With
    With Selection.Font
        .Color = -4165632
        .TintAndShade = 0
    End With
End Sub
