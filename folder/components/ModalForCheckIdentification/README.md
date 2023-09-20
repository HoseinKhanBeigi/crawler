### Components skeleton

```
-ModalForCheckIdentification (stateData, handleChange)
	-CPModal
		-ModalForCheckIdentificationTabs
			-CPTab
				-ModalForCheckIdentificationTabPersonalProfile +
					-ModalForCheckIdentificationTabPersonalProfileFields +
					-ModalForCheckIdentificationTabPersonalProfileDocs +
				-ModalForCheckIdentificationTabBankProfile +
					-ModalForCheckIdentificationTabBankFields +
				-ModalForCheckIdentificationTabBusinessProfile +
					-ModalForCheckIdentificationTabBusinessFields +
					-ModalForCheckIdentificationTabBusinessDocs *
				-ModalForCheckIdentificationTabContactInformation +
		-ModalForCheckIdentificationRejection +
		-ModalForCheckIdentificationSubmit +
```
