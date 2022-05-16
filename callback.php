<?php

if (!empty($_POST['email'])) {
	$reply_to = $_POST['email'];
}
else {
	$reply_to = $_SERVER['SERVER_ADMIN'];
}

$mails = array('work.equitas@gmail.com');

define('MAIL_SUBJECT', 'NEW REQUEST');

function XMail($to) {
	global $reply_to;
	
	$boundary = '----------' . md5(uniqid(time()));
	$headers = array();
	$headers[] = "MIME-Version: 1.0";
	$headers[] = "Content-Type: multipart/mixed; boundary=\"$boundary\"";
	$headers[] = "From: " . $_SERVER['SERVER_ADMIN'];
	$headers[] = "To: " . $to;
	$headers[] = "Reply-To: " . $reply_to;
	$headers[] = "Subject: " . MAIL_SUBJECT;
	$headers[] = "X-Mailer: PHP/" . phpversion();
	$headers[] = "boundary=" . $boundary;
	$headers[] = '';
	$message = array();
	$message[] = '--' . $boundary;
	$message[] = 'Content-Type: text/plain; charset=utf-8';
	$message[] = 'Content-Transfer-Encoding: 8bit';
	$message[] = '';

	$data = $_POST;
	$keys = array(
		'name' => 'Имя',
		'phone' => 'Телефон',
		'from' => 'Форма'
	);
	
	foreach ($data as $k => $v) {
		$k = str_replace(array_keys($keys), array_values($keys), $k);
		if (is_array($v)) {
			$v = implode(', ', $v);
		}
		$message[] = $k . ': ' . $v;
	}

	$message[] = '';
	if (isset($_FILES['attachment']['tmp_name'])) {
		$file = fopen($_FILES['attachment']['tmp_name'], 'rb');
		$message[] = '--' . $boundary;
		$message[] = 'Content-Type: application/octet-stream; name=' . $_FILES['attachment']['name'];
		$message[] = 'Content-Transfer-Encoding: base64';
		$message[] = 'Content-Disposition: attachment; name=' . $_FILES['attachment']['name'];
		$message[] = '';
		$message[] = chunk_split(base64_encode(fread($file, filesize($_FILES['attachment']['tmp_name']))));
	}
	return mail($to, MAIL_SUBJECT, implode("\r\n", $message), implode("\r\n", $headers));
}

foreach ($mails as $mail) {
	XMail($mail);
}

?>