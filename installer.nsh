!macro customInit
  ; Verificar si ya está instalado
  ReadRegStr $0 HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\{appId}" "DisplayName"
  ${If} $0 != ""
    MessageBox MB_YESNO "Legiscorp Garros ya está instalado. ¿Desea continuar con la instalación?" IDYES continue IDNO end
    end:
      Quit
    continue:
  ${EndIf}
!macroend

!macro customInstall
  ; Crear accesos directos adicionales
  CreateShortCut "$DESKTOP\Legiscorp Garros.lnk" "$INSTDIR\Legiscorp Garros.exe"
!macroend