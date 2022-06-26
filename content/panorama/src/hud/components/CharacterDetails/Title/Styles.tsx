export const Styles = {
	Container: (): Partial<VCSSStyleDeclaration> => ({
		width: '100%',
		backgroundColor: 'rgba(30, 30, 30, 0.525)',
	}),

	Label: (): Partial<VCSSStyleDeclaration> => ({
		color: 'rgba(200, 200, 200, 0.45)',
		fontSize: '15px',
		verticalAlign: 'center',
		horizontalAlign: 'left',
		fontWeight: 'light',
		letterSpacing: '1.5px',
		paddingTop: '2.5px',
		paddingLeft: '10px',
	}),

	CloseBtn: (isHovering: boolean): Partial<VCSSStyleDeclaration> => ({
		verticalAlign: 'center',
		horizontalAlign: 'right',
		height: '24px',
		width: '24px',
		padding: '2px',
		marginRight: '2.5px',
		opacity: '0.75',
		transition: 'transform 0.5s ease-in-out 0.0s, background-color 0.5s ease-in-out 0.0s',
		backgroundColor: isHovering ? 'rgba(60, 60, 60, 1.0)' : 'rgba(0, 0, 0, 0.0)',
		border: isHovering ? '1px solid rgba(70, 70, 70, 1.0)' : '0px solid rgba(0, 0, 0, 1.0)',
		washColor: isHovering ? ' rgba(100, 100, 100, 0.25)' : 'rgba(100, 100, 100, 0.5)',
		transform: isHovering ? 'scale3d(1.2, 1.2, 0)' : 'scale3d(1.0, 1.0, 0)',
	}),
}
