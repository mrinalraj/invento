export default `<html lang="en" style="border: 0; font: inherit; font-size: 100%; margin: 0; padding: 0; vertical-align: baseline;">

	<head>
		<meta charset="UTF-8" />
		<title>Print Preview</title>
	</head>

	<body style="
			border: 0;
			font: inherit;
			font-family: 'Open Sans', sans-serif;
			font-size: 12px;
			height: 840px;
			line-height: 1;
			margin: auto;
			padding: 0;
			vertical-align: baseline;
			width: 592px;
		">
		<div
			style="border: 0; font: inherit; font-size: 100%; margin: 0; padding: 4%; position: relative; vertical-align: baseline;">
			<div
				style="border: 0; font: inherit; font-size: 100%; height: 80px; margin: 0; padding: 0; vertical-align: baseline;">
				<div
					style="border: 0; float: left; font: inherit; font-size: 100%; margin: 0; padding: 0; vertical-align: baseline; width: 50%;">
					<img src="http://placehold.it/230x70&text=logo" alt
						style="border: 0; font: inherit; font-size: 100%; margin: 0; padding: 0; vertical-align: baseline;" />
				</div>
				<div
					style="border: 0; float: right; font: inherit; font-size: 100%; margin: 0; padding: 0; text-align: right; vertical-align: baseline;">
					<h3
						style="border: 0; font: inherit; font-size: 100%; margin: 0; padding: 0; vertical-align: baseline;">
						<strong
							style="border: 0; font: inherit; font-size: 100%; font-weight: 700; margin: 0; padding: 0; vertical-align: baseline;">Bill</strong>
					</h3>
					<h4
						style="border: 0; font: inherit; font-size: 85%; font-weight: 600; margin: 0; padding: 0; vertical-align: baseline;">
						Invoice No. {{invoiceNo}}</h4>
					<p
						style="border: 0; font: inherit; font-size: 85%; margin: 0; margin-top: 2%; padding: 0; vertical-align: baseline;">
						Date : {{invoiceDate}}</p>
				</div>
			</div>

			<div
				style="border: 0; font: inherit; font-size: 100%; height: 160px; margin: 0; padding: 0; vertical-align: baseline;">
				<div style="
						background: #efefef;
						border: 0;
						float: left;
						font: inherit;
						font-size: 85%;
						line-height: 120%;
						margin: 0;
						margin-top: 30px;
						min-height: 90px;
						padding: 1.5%;
						vertical-align: baseline;
						width: 45%;
					">
					<p
						style="border: 0; font: inherit; font-size: 100%; margin: 0; padding: 0; vertical-align: baseline;">
						<strong
							style="border: 0; font: inherit; font-size: 100%; font-weight: 700; margin: 0; padding: 0; vertical-align: baseline;">{{retailerDetails.name}}</strong><br />
						Address : {{retailerDetails.address}} <br /><br />
						Phone: {{retailerDetails.phone}} <br />
						Email: {{retailerDetails.email}} <br />
					</p>
				</div>
			</div>

			<div
				style="border: 0; font: inherit; font-size: 100%; margin: 0; margin-top: 10px; padding: 0; vertical-align: baseline;">
				<p
					style="border: 0; font: inherit; font-size: 65%; font-weight: 700; margin: 0; margin-bottom: 1%; padding: 0; text-align: right; vertical-align: baseline;">
					Amounts expressed in {{currency}}
				</p>
				<table style="
						border: solid grey 1px;
						border-collapse: collapse;
						border-spacing: 0;
						font: inherit;
						font-size: 85%;
						margin: 0;
						padding: 0;
						vertical-align: baseline;
						width: 100%;
					">
					<tr
						style="border: solid grey 1px; font: inherit; font-size: 100%; margin: 0; padding: 0; vertical-align: baseline;">
						<th style="
								border: 0;
								border-right: solid grey 1px;
								font: inherit;
								font-size: 100%;
								font-weight: 400;
								margin: 0;
								padding: 3px;
								text-align: left;
								vertical-align: baseline;
							">
							Product Name
						</th>
						<th style="
								border: 0;
								border-right: solid grey 1px;
								font: inherit;
								font-size: 100%;
								font-weight: 400;
								margin: 0;
								padding: 3px;
								vertical-align: baseline;
								width: 45px;
							">
							Quantity (Nos.)
						</th>
						<th style="
								border: 0;
								border-right: solid grey 1px;
								font: inherit;
								font-size: 100%;
								font-weight: 400;
								margin: 0;
								padding: 3px;
								vertical-align: baseline;
								width: 60px;
							">
							MRP
						</th>
						<th style="
								border: 0;
								border-right: solid grey 1px;
								font: inherit;
								font-size: 100%;
								font-weight: 400;
								margin: 0;
								padding: 3px;
								vertical-align: baseline;
								width: 45px;
							">
							Rate
						</th>
						<th style="
								border: 0;
								border-right: solid grey 1px;
								font: inherit;
								font-size: 100%;
								font-weight: 400;
								margin: 0;
								padding: 3px;
								vertical-align: baseline;
								width: 80px;
							">
							Amount
						</th>
					</tr>
					<div>
						{{#each items}}
						<tr
							style="border: 0; font: inherit; font-size: 100%; margin: 0; padding: 0; vertical-align: baseline;">
							<td style="
									border: 0;
									border-right: solid grey 1px;
									font: inherit;
									font-size: 100%;
									height: 10px;
									margin: 0;
									padding: 1px 4px;
									padding-bottom: 3px;
									padding-top: 8px;
									vertical-align: baseline;
								">
								{{this.name}}
							</td>
							<td style="
									border: 0;
									border-right: solid grey 1px;
									font: inherit;
									font-size: 100%;
									height: 10px;
									margin: 0;
									padding: 1px 4px;
									padding-bottom: 3px;
									padding-right: 1%;
									padding-top: 8px;
									text-align: right;
									vertical-align: baseline;
								">
								{{this.quantity}}
							</td>
							<td style="
									border: 0;
									border-right: solid grey 1px;
									font: inherit;
									font-size: 100%;
									height: 10px;
									margin: 0;
									padding: 1px 4px;
									padding-bottom: 3px;
									padding-right: 1%;
									padding-top: 8px;
									text-align: right;
									vertical-align: baseline;
								">
								{{this.pricePerUnit}}
							</td>
							<td style="
									border: 0;
									border-right: solid grey 1px;
									font: inherit;
									font-size: 100%;
									height: 10px;
									margin: 0;
									padding: 1px 4px;
									padding-bottom: 3px;
									padding-right: 1%;
									padding-top: 8px;
									text-align: right;
									vertical-align: baseline;
								">
								{{this.rate}}
							</td>
							<td style="
									border: 0;
									border-right: solid grey 1px;
									font: inherit;
									font-size: 100%;
									height: 10px;
									margin: 0;
									padding: 1px 4px;
									padding-bottom: 3px;
									padding-right: 1%;
									padding-top: 8px;
									text-align: right;
									vertical-align: baseline;
								">
								{{this.amount}}
							</td>
						</tr>
						{{/each}}
					</div>
				</table>
			</div>

			<div
				style="border: 0; font: inherit; font-size: 100%; height: 170px; margin: 0; margin-top: 30px; padding: 0; vertical-align: baseline;">
				<div
					style="border: 0; float: left; font: inherit; font-size: 100%; margin: 0; padding: 0; vertical-align: baseline;">
					<h4 style="
							border: 0;
							font: inherit;
							font-size: 10px;
							font-style: italic;
							font-weight: 600;
							margin: 0;
							margin-bottom: 4px;
							padding: 0;
							vertical-align: baseline;
						">
						Note :
					</h4>
					<p
						style="border: 0; font: inherit; font-size: 10px; font-style: italic; margin: 0; padding: 0; vertical-align: baseline;">
						Additional Information
					</p>
				</div>
				<div
					style="border: 0; font: inherit; font-size: 100%; margin: 0; padding: 0; vertical-align: baseline;">
					<table style="
							border: 0;
							border-collapse: collapse;
							border-spacing: 0;
							float: right;
							font: inherit;
							font-size: 85%;
							margin: 0;
							padding: 0;
							vertical-align: baseline;
							width: 260px;
						">
						<tr
							style="background: #efefef; border: 0; font: inherit; font-size: 100%; font-weight: 600; margin: 0; padding: 0; vertical-align: baseline;">
							<td
								style="border: 0; font: inherit; font-size: 100%; margin: 0; padding: 3px 4px; vertical-align: baseline;">
								Total Amount:</td>
							<td
								style="border: 0; font: inherit; font-size: 100%; margin: 0; padding: 3px 4px; text-align: right; vertical-align: baseline;">
								{{currency}} {{totalAmount}}
							</td>
						</tr>
					</table>
				</div>
			</div>

			<div style="
					border: 0;
					border-top: solid grey 1px;
					bottom: 4%;
					font: inherit;
					font-size: 100%;
					left: 4%;
					margin: auto;
					padding: 0;
					position: absolute;
					right: 4%;
					vertical-align: baseline;
				">
				<p
					style="border: 0; font: inherit; font-size: 65%; line-height: 140%; margin: 0; margin-top: 1%; padding: 0; text-align: center; vertical-align: baseline;">
					Lorem Ipsum <br />
					Lorem Ipsum
				</p>
			</div>
		</div>
	</body>

</html>`
