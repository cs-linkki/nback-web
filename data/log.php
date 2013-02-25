<?php

	/* function for cleaning data, i.e. making it save to be written */
	function clean_data( $data ) {
		return $data;
		$data = strip_tags( $data );
		if( !$debug ) {
			$data = mysql_real_escape_string( $data );
		}
		return $data;
	}

	$data = clean_data( $_POST['data'] );


	$file = fopen( './data.txt', 'a+' );
	fwrite( $file , $data ."\n" );
	fclose( $file );

?>
