PGDMP     7                     w            postgres    11.0    11.0 [    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �           1262    13364    postgres    DATABASE     z   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE postgres;
             postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                  postgres    false    3302                        3079    24615    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            �           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    24620    car    TABLE     �  CREATE TABLE public.car (
    car_id integer NOT NULL,
    make integer,
    model integer,
    variant integer,
    vehicle_type integer,
    fuel_type integer,
    transmission_type integer,
    insurance integer,
    exterior_color integer,
    mileage numeric,
    make_year numeric,
    owners numeric,
    cost_price numeric,
    purchased_from integer,
    selling_price numeric,
    sold_to integer,
    created_by integer,
    create_date timestamp without time zone,
    updated_by integer,
    update_date timestamp without time zone,
    is_deleted boolean,
    is_flooded boolean DEFAULT false,
    is_accidental boolean DEFAULT false,
    insurance_year numeric,
    make_month numeric,
    interior_color integer,
    fuel_economy numeric,
    description character varying(500),
    is_sold boolean DEFAULT false,
    license_plate character varying(50),
    purchased_on character varying,
    sold_on character varying(15)
);
    DROP TABLE public.car;
       public         postgres    false            �            1259    24629    car_car_id_seq    SEQUENCE     �   CREATE SEQUENCE public.car_car_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.car_car_id_seq;
       public       postgres    false    196            �           0    0    car_car_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.car_car_id_seq OWNED BY public.car.car_id;
            public       postgres    false    197            �            1259    24631    client    TABLE     �  CREATE TABLE public.client (
    client_id integer NOT NULL,
    name character varying(50) NOT NULL,
    phone numeric(12,0),
    email character varying(50),
    address character varying(100),
    city character varying(50),
    state integer,
    pin character varying(10),
    created_by integer,
    create_date timestamp without time zone,
    updated_by integer,
    update_date timestamp without time zone,
    is_investor boolean DEFAULT false,
    is_owner boolean
);
    DROP TABLE public.client;
       public         postgres    false            �            1259    24635    client_client_id_seq    SEQUENCE     �   CREATE SEQUENCE public.client_client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.client_client_id_seq;
       public       postgres    false    198            �           0    0    client_client_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.client_client_id_seq OWNED BY public.client.client_id;
            public       postgres    false    199            �            1259    24637    color    TABLE       CREATE TABLE public.color (
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer,
    color_id integer NOT NULL
);
    DROP TABLE public.color;
       public         postgres    false            �            1259    24641    color_color_id_seq    SEQUENCE     �   CREATE SEQUENCE public.color_color_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.color_color_id_seq;
       public       postgres    false    200            �           0    0    color_color_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.color_color_id_seq OWNED BY public.color.color_id;
            public       postgres    false    201            �            1259    24643    expenses    TABLE       CREATE TABLE public.expenses (
    expense_id integer NOT NULL,
    name character varying(50),
    created_by integer,
    create_date timestamp without time zone,
    updated_by integer,
    update_date timestamp without time zone,
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.expenses;
       public         postgres    false            �            1259    24647    expenses_expense_id_seq    SEQUENCE     �   CREATE SEQUENCE public.expenses_expense_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.expenses_expense_id_seq;
       public       postgres    false    202            �           0    0    expenses_expense_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.expenses_expense_id_seq OWNED BY public.expenses.expense_id;
            public       postgres    false    203            �            1259    24649 	   fuel_type    TABLE     '  CREATE TABLE public.fuel_type (
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer,
    fuel_type_id integer NOT NULL
);
    DROP TABLE public.fuel_type;
       public         postgres    false            �            1259    24653    fuel_type_fuel_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fuel_type_fuel_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.fuel_type_fuel_type_id_seq;
       public       postgres    false    204            �           0    0    fuel_type_fuel_type_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.fuel_type_fuel_type_id_seq OWNED BY public.fuel_type.fuel_type_id;
            public       postgres    false    205            �            1259    24655 	   insurance    TABLE     '  CREATE TABLE public.insurance (
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer,
    insurance_id integer NOT NULL
);
    DROP TABLE public.insurance;
       public         postgres    false            �            1259    24659    insurance_insurance_id_seq    SEQUENCE     �   CREATE SEQUENCE public.insurance_insurance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.insurance_insurance_id_seq;
       public       postgres    false    206            �           0    0    insurance_insurance_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.insurance_insurance_id_seq OWNED BY public.insurance.insurance_id;
            public       postgres    false    207            �            1259    24661    make    TABLE       CREATE TABLE public.make (
    make_id integer NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer
);
    DROP TABLE public.make;
       public         postgres    false            �            1259    24665    make_make_id_seq    SEQUENCE     �   CREATE SEQUENCE public.make_make_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.make_make_id_seq;
       public       postgres    false    208            �           0    0    make_make_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.make_make_id_seq OWNED BY public.make.make_id;
            public       postgres    false    209            �            1259    24667    model    TABLE       CREATE TABLE public.model (
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer,
    model_id integer NOT NULL
);
    DROP TABLE public.model;
       public         postgres    false            �            1259    24671    model_model_id_seq    SEQUENCE     �   CREATE SEQUENCE public.model_model_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.model_model_id_seq;
       public       postgres    false    210            �           0    0    model_model_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.model_model_id_seq OWNED BY public.model.model_id;
            public       postgres    false    211            �            1259    24673    transaction_details    TABLE       CREATE TABLE public.transaction_details (
    transaction_details_id integer NOT NULL,
    transaction_type_id integer,
    car_id integer,
    investor_id integer,
    description character varying(500),
    created_by integer,
    create_date timestamp without time zone,
    updated_by integer,
    update_date timestamp without time zone,
    date timestamp without time zone,
    expense_id integer,
    transaction_type_mode character varying(10),
    credit integer,
    debit integer,
    percentage numeric,
    is_void boolean
);
 '   DROP TABLE public.transaction_details;
       public         postgres    false            �            1259    24679    transaction_type    TABLE     �   CREATE TABLE public.transaction_type (
    transaction_type_id integer NOT NULL,
    name character varying(100),
    mode character varying(10),
    is_hidden boolean DEFAULT false
);
 $   DROP TABLE public.transaction_type;
       public         postgres    false            �            1259    24683    transaction_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transaction_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.transaction_type_id_seq;
       public       postgres    false    213            �           0    0    transaction_type_id_seq    SEQUENCE OWNED BY     d   ALTER SEQUENCE public.transaction_type_id_seq OWNED BY public.transaction_type.transaction_type_id;
            public       postgres    false    214            �            1259    24685    transasction_details_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."transasction_details_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."transasction_details_Id_seq";
       public       postgres    false    212            �           0    0    transasction_details_Id_seq    SEQUENCE OWNED BY     p   ALTER SEQUENCE public."transasction_details_Id_seq" OWNED BY public.transaction_details.transaction_details_id;
            public       postgres    false    215            �            1259    24687    transmission_type    TABLE     P  CREATE TABLE public.transmission_type (
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer,
    transmission_type_id integer NOT NULL,
    "isVisible" boolean
);
 %   DROP TABLE public.transmission_type;
       public         postgres    false            �            1259    24691 *   transmission_type_transmission_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transmission_type_transmission_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 A   DROP SEQUENCE public.transmission_type_transmission_type_id_seq;
       public       postgres    false    216            �           0    0 *   transmission_type_transmission_type_id_seq    SEQUENCE OWNED BY     y   ALTER SEQUENCE public.transmission_type_transmission_type_id_seq OWNED BY public.transmission_type.transmission_type_id;
            public       postgres    false    217            �            1259    24693    variant    TABLE     #  CREATE TABLE public.variant (
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer,
    variant_id integer NOT NULL
);
    DROP TABLE public.variant;
       public         postgres    false            �            1259    24697    variant_variant_id_seq    SEQUENCE     �   CREATE SEQUENCE public.variant_variant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.variant_variant_id_seq;
       public       postgres    false    218            �           0    0    variant_variant_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.variant_variant_id_seq OWNED BY public.variant.variant_id;
            public       postgres    false    219            �            1259    24699    vehicle_type    TABLE     -  CREATE TABLE public.vehicle_type (
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer,
    vehicle_type_id integer NOT NULL
);
     DROP TABLE public.vehicle_type;
       public         postgres    false            �            1259    24703     vehicle_type_vehicle_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vehicle_type_vehicle_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.vehicle_type_vehicle_type_id_seq;
       public       postgres    false    220            �           0    0     vehicle_type_vehicle_type_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.vehicle_type_vehicle_type_id_seq OWNED BY public.vehicle_type.vehicle_type_id;
            public       postgres    false    221            *           2604    24705 
   car car_id    DEFAULT     h   ALTER TABLE ONLY public.car ALTER COLUMN car_id SET DEFAULT nextval('public.car_car_id_seq'::regclass);
 9   ALTER TABLE public.car ALTER COLUMN car_id DROP DEFAULT;
       public       postgres    false    197    196            ,           2604    24706    client client_id    DEFAULT     t   ALTER TABLE ONLY public.client ALTER COLUMN client_id SET DEFAULT nextval('public.client_client_id_seq'::regclass);
 ?   ALTER TABLE public.client ALTER COLUMN client_id DROP DEFAULT;
       public       postgres    false    199    198            .           2604    24707    color color_id    DEFAULT     p   ALTER TABLE ONLY public.color ALTER COLUMN color_id SET DEFAULT nextval('public.color_color_id_seq'::regclass);
 =   ALTER TABLE public.color ALTER COLUMN color_id DROP DEFAULT;
       public       postgres    false    201    200            0           2604    24708    expenses expense_id    DEFAULT     z   ALTER TABLE ONLY public.expenses ALTER COLUMN expense_id SET DEFAULT nextval('public.expenses_expense_id_seq'::regclass);
 B   ALTER TABLE public.expenses ALTER COLUMN expense_id DROP DEFAULT;
       public       postgres    false    203    202            2           2604    24709    fuel_type fuel_type_id    DEFAULT     �   ALTER TABLE ONLY public.fuel_type ALTER COLUMN fuel_type_id SET DEFAULT nextval('public.fuel_type_fuel_type_id_seq'::regclass);
 E   ALTER TABLE public.fuel_type ALTER COLUMN fuel_type_id DROP DEFAULT;
       public       postgres    false    205    204            4           2604    24710    insurance insurance_id    DEFAULT     �   ALTER TABLE ONLY public.insurance ALTER COLUMN insurance_id SET DEFAULT nextval('public.insurance_insurance_id_seq'::regclass);
 E   ALTER TABLE public.insurance ALTER COLUMN insurance_id DROP DEFAULT;
       public       postgres    false    207    206            6           2604    24711    make make_id    DEFAULT     l   ALTER TABLE ONLY public.make ALTER COLUMN make_id SET DEFAULT nextval('public.make_make_id_seq'::regclass);
 ;   ALTER TABLE public.make ALTER COLUMN make_id DROP DEFAULT;
       public       postgres    false    209    208            8           2604    24712    model model_id    DEFAULT     p   ALTER TABLE ONLY public.model ALTER COLUMN model_id SET DEFAULT nextval('public.model_model_id_seq'::regclass);
 =   ALTER TABLE public.model ALTER COLUMN model_id DROP DEFAULT;
       public       postgres    false    211    210            9           2604    24713 *   transaction_details transaction_details_id    DEFAULT     �   ALTER TABLE ONLY public.transaction_details ALTER COLUMN transaction_details_id SET DEFAULT nextval('public."transasction_details_Id_seq"'::regclass);
 Y   ALTER TABLE public.transaction_details ALTER COLUMN transaction_details_id DROP DEFAULT;
       public       postgres    false    215    212            ;           2604    24714 $   transaction_type transaction_type_id    DEFAULT     �   ALTER TABLE ONLY public.transaction_type ALTER COLUMN transaction_type_id SET DEFAULT nextval('public.transaction_type_id_seq'::regclass);
 S   ALTER TABLE public.transaction_type ALTER COLUMN transaction_type_id DROP DEFAULT;
       public       postgres    false    214    213            =           2604    24715 &   transmission_type transmission_type_id    DEFAULT     �   ALTER TABLE ONLY public.transmission_type ALTER COLUMN transmission_type_id SET DEFAULT nextval('public.transmission_type_transmission_type_id_seq'::regclass);
 U   ALTER TABLE public.transmission_type ALTER COLUMN transmission_type_id DROP DEFAULT;
       public       postgres    false    217    216            ?           2604    24716    variant variant_id    DEFAULT     x   ALTER TABLE ONLY public.variant ALTER COLUMN variant_id SET DEFAULT nextval('public.variant_variant_id_seq'::regclass);
 A   ALTER TABLE public.variant ALTER COLUMN variant_id DROP DEFAULT;
       public       postgres    false    219    218            A           2604    24717    vehicle_type vehicle_type_id    DEFAULT     �   ALTER TABLE ONLY public.vehicle_type ALTER COLUMN vehicle_type_id SET DEFAULT nextval('public.vehicle_type_vehicle_type_id_seq'::regclass);
 K   ALTER TABLE public.vehicle_type ALTER COLUMN vehicle_type_id DROP DEFAULT;
       public       postgres    false    221    220            �          0    24620    car 
   TABLE DATA               �  COPY public.car (car_id, make, model, variant, vehicle_type, fuel_type, transmission_type, insurance, exterior_color, mileage, make_year, owners, cost_price, purchased_from, selling_price, sold_to, created_by, create_date, updated_by, update_date, is_deleted, is_flooded, is_accidental, insurance_year, make_month, interior_color, fuel_economy, description, is_sold, license_plate, purchased_on, sold_on) FROM stdin;
    public       postgres    false    196   �p       �          0    24631    client 
   TABLE DATA               �   COPY public.client (client_id, name, phone, email, address, city, state, pin, created_by, create_date, updated_by, update_date, is_investor, is_owner) FROM stdin;
    public       postgres    false    198   +s       �          0    24637    color 
   TABLE DATA               m   COPY public.color (is_deleted, created_by, create_date, update_date, name, updated_by, color_id) FROM stdin;
    public       postgres    false    200   �t       �          0    24643    expenses 
   TABLE DATA               r   COPY public.expenses (expense_id, name, created_by, create_date, updated_by, update_date, is_deleted) FROM stdin;
    public       postgres    false    202   �u       �          0    24649 	   fuel_type 
   TABLE DATA               u   COPY public.fuel_type (is_deleted, created_by, create_date, update_date, name, updated_by, fuel_type_id) FROM stdin;
    public       postgres    false    204   �u       �          0    24655 	   insurance 
   TABLE DATA               u   COPY public.insurance (is_deleted, created_by, create_date, update_date, name, updated_by, insurance_id) FROM stdin;
    public       postgres    false    206   nv       �          0    24661    make 
   TABLE DATA               k   COPY public.make (make_id, is_deleted, created_by, create_date, update_date, name, updated_by) FROM stdin;
    public       postgres    false    208   �v       �          0    24667    model 
   TABLE DATA               m   COPY public.model (is_deleted, created_by, create_date, update_date, name, updated_by, model_id) FROM stdin;
    public       postgres    false    210   �w       �          0    24673    transaction_details 
   TABLE DATA               �   COPY public.transaction_details (transaction_details_id, transaction_type_id, car_id, investor_id, description, created_by, create_date, updated_by, update_date, date, expense_id, transaction_type_mode, credit, debit, percentage, is_void) FROM stdin;
    public       postgres    false    212   �x       �          0    24679    transaction_type 
   TABLE DATA               V   COPY public.transaction_type (transaction_type_id, name, mode, is_hidden) FROM stdin;
    public       postgres    false    213   �|       �          0    24687    transmission_type 
   TABLE DATA               �   COPY public.transmission_type (is_deleted, created_by, create_date, update_date, name, updated_by, transmission_type_id, "isVisible") FROM stdin;
    public       postgres    false    216   "}       �          0    24693    variant 
   TABLE DATA               q   COPY public.variant (is_deleted, created_by, create_date, update_date, name, updated_by, variant_id) FROM stdin;
    public       postgres    false    218   �}       �          0    24699    vehicle_type 
   TABLE DATA               {   COPY public.vehicle_type (is_deleted, created_by, create_date, update_date, name, updated_by, vehicle_type_id) FROM stdin;
    public       postgres    false    220   �~       �           0    0    car_car_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.car_car_id_seq', 47, true);
            public       postgres    false    197            �           0    0    client_client_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.client_client_id_seq', 80, true);
            public       postgres    false    199            �           0    0    color_color_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.color_color_id_seq', 11, true);
            public       postgres    false    201            �           0    0    expenses_expense_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.expenses_expense_id_seq', 9, true);
            public       postgres    false    203            �           0    0    fuel_type_fuel_type_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.fuel_type_fuel_type_id_seq', 14, true);
            public       postgres    false    205            �           0    0    insurance_insurance_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.insurance_insurance_id_seq', 12, true);
            public       postgres    false    207            �           0    0    make_make_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.make_make_id_seq', 38, true);
            public       postgres    false    209            �           0    0    model_model_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.model_model_id_seq', 39, true);
            public       postgres    false    211            �           0    0    transaction_type_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.transaction_type_id_seq', 13, true);
            public       postgres    false    214            �           0    0    transasction_details_Id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public."transasction_details_Id_seq"', 1614, true);
            public       postgres    false    215                        0    0 *   transmission_type_transmission_type_id_seq    SEQUENCE SET     Y   SELECT pg_catalog.setval('public.transmission_type_transmission_type_id_seq', 15, true);
            public       postgres    false    217                       0    0    variant_variant_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.variant_variant_id_seq', 28, true);
            public       postgres    false    219                       0    0     vehicle_type_vehicle_type_id_seq    SEQUENCE SET     O   SELECT pg_catalog.setval('public.vehicle_type_vehicle_type_id_seq', 20, true);
            public       postgres    false    221            C           2606    24719    car car1_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.car
    ADD CONSTRAINT car1_pkey PRIMARY KEY (car_id);
 7   ALTER TABLE ONLY public.car DROP CONSTRAINT car1_pkey;
       public         postgres    false    196            E           2606    24721    client client_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (client_id);
 <   ALTER TABLE ONLY public.client DROP CONSTRAINT client_pkey;
       public         postgres    false    198            G           2606    24723    expenses expenses_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (expense_id);
 @   ALTER TABLE ONLY public.expenses DROP CONSTRAINT expenses_pkey;
       public         postgres    false    202            I           2606    24725    make make_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.make
    ADD CONSTRAINT make_pkey PRIMARY KEY (make_id);
 8   ALTER TABLE ONLY public.make DROP CONSTRAINT make_pkey;
       public         postgres    false    208            M           2606    24727 &   transaction_type transaction_type_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.transaction_type
    ADD CONSTRAINT transaction_type_pkey PRIMARY KEY (transaction_type_id);
 P   ALTER TABLE ONLY public.transaction_type DROP CONSTRAINT transaction_type_pkey;
       public         postgres    false    213            K           2606    24729 -   transaction_details transasction_details_pkey 
   CONSTRAINT        ALTER TABLE ONLY public.transaction_details
    ADD CONSTRAINT transasction_details_pkey PRIMARY KEY (transaction_details_id);
 W   ALTER TABLE ONLY public.transaction_details DROP CONSTRAINT transasction_details_pkey;
       public         postgres    false    212            �   4  x���M��0���S�pY����:U9�������Lw��a������+p& �(y4��8���<���ra|��  �AZЈ�\�!^ԭv~>+����/���y�/H˼�`�lT<�t��lA�M��^�w���Q���7�x�'��}�#�@H�anIz��[�P�$������v���R�'��c�D^�	AwM�A2�����gњw�}��&UI4��'��i ��}��>����<{�?[����ɀyǑa�n dTTu3�dЋa]j�� ~I!k�����p��)!#9jqiL�\�!Eb�78N8�"I"�-��jЧm�=� ߰1e�[g�J�U�s��L�Ĩ�\���&���J�U�)4�d��\��O��(��tR��9�v���.�X�]�u0Ff�q�6�m'��O��37@2Ӿ�%�&{RHZ��+��6c�u�'-bɳ����\��x��M�o�AT��mf�_Q>��F����Id9w��\�BrPH����<��YHs�6�Tۙ��P"K(�3�-8=�Y��_KG      �   �  x����n�@�g�)n�d�����}�,:y9��H�l��ܢ}�2��(u������GJ!���ݕ��%��� LK�%�2�mʎ�Gg�.al����$�|����]Ȏ5G$t��&:8�a��=�K�K$�>S��'����@[N��
ƅ�ӵ����M�B��O�X�&��ut�#I��]���v۷75Wʏ�S6�=J 7�.[�FG�jNp��S�5���'�ާx�D:x���aӖ��ɰ�x���������zs��B��0�jj�ן�/�����.���O�n�M�Ҟ���9g��	0Ht��g
��dG��)E����,��v鐂�qJ�@I�Z�<VVM3%��������a&�}���N ��صe;E�_�f�䃞P�t�4��C�      �   �   x�u�;�0��>E.`kw�v�.9 M���D
��#[�%�L�4�A�"�hQ�8$�]����\�å��%�d#ǀ���y|�R�
�6Pd/���D�L	-�D��x����b �)'���Q1�9Jʊˌ�׿�~��{i�܉�І����<W���Z�/�.B}      �   \   x�=�=
�0�9=�hɗ�����8��EA�?"��Ɨi��~�}%�0��H�Vb*ɂB!Jux-�踷���m��bI}�"kf�wιn<t      �   n   x�m�1
�0D�Z{
_@bgv$�.ܙ�edN�O"�5��oT�Dr�R}�d"�3ú�{���W?P���������%)]q���l�vr��it��M�|X�5��i�U      �   A   x�K�4�420��54�52R0��21�25�3��076���t��-(J�H�+�,K	q��qqq ���      �   �   x�m�;n�0�Y>E.`����S�t�E�]�@� �=$����K*@� }?!���ːa�����D�:�螟(�/�(�c^�u2�	�U��')�b"�ޛӛ9߷y��~�[�2�%-~�}��K�S fBſ߫�m+�s��^�y��%׀kx?����?���8����8?jʷR��Cd-�Tކ�~C;������-ϕ��	X�\�z�_�� ��QgP��_IxV�g�zݗ���]�� �oe      �   �   x�u�;n�0�Z<�. ����>'p#�R  Q Iv�>�S��+fg���z����Y�a��k��?�Ws�i0�=���yM6�sA����ʇbK�LFk)QA��􏍚�{�$�M۲����Ǵ��h����!2I�i;��ʩ�]iG�l�����m��=s��vߏi�ڜ���3��snv��m4BJI�����q�Ň�wF3yW�������CلL�ܝ�,�_�|���ɠ��E+�~{t�      �   �  x��W[r�8��N�5O ��ON����Ԧ��M9Ξ?P� �`��LQݍ�t�Ji��u��i���2�D�v<#?a�f�A8�Iy�/ ��ΤO�m�&�.׿��ׯ3��_O(�#,�L��������}C� 6+U��/�T �������i������J��!�C6i��`��L�+O\x����΃j[XV��(���D:K9"��sP9 �-O���!O��D�ď�d���ٍH��g��,��P�RP��(Ѝ'��,�k��!J[��#�)�P̏�G��GZ��B��G��"�>=�!`Ӗgu�ags�C2����<d�A���8��ӷ�痟��e���q&���������AKq�<�o+Q������%��6�}�Wς;���ũ������?_~\/O_�{���8���E�.��"tT<�LC���4o�i�T�T
�V��R3	1a����n#:�����流!�����h&k�cUO#�R����v��`�!v�/r�ߕ�d� i�-�����\��H��։L���l_���mZ�w�ǒO�ޙ[�Q�$��T�8R�����0x`Z�QO8���kF��m��y޶� Zѫ�F�}豷���~g�L#�R[{*�]�w��Y-$���ڏ:�A��e���(�D(����H[�Ŷ��z���uצ���ڣ&��ѫmy?�빓,� m��#���/��#|�}�c��s m�e�+O5V�/O%���h�X˛����X<��&�^��&b��Q��X<VO��2Q|�>�d2/�1�ԋ�z?]o3M�;_q�y(^f�`��>����4O��B����Ӡ�~*�����,����2yo>(>�CAl=���GŻ�� 8Y�Ms��!��N(�H�0�P$y���da�݃�U��(��*I� t{aʣ7���G1��~�S��w~~��n+�.�|�>}����2A      �   g   x�3�t�(H�+N�LIM�,�L�2�(�O2��RS�T	�	�O~q1TA	��!gxfIFJQb9B��3�,��$75I��g@iQrF"��Ɯ��9)0Ei\1z\\\ D{)c      �   d   x�%�;� E�V� 3À@�t4Ą��O�W�y��;U� ��5����%cم8����\���ߕ�Qj�
)�ML�=x
�7�v���ۇ�@�H)�_q      �   ?  x�m��n�0@��W�`yf��V�ܪ B����R�(����7v�	���{��\`A�B���DO,�!�l��*F8�fh��.ϯ��
�NN� �lᭆ���{�39�=k!Iڔh��BX},)I6')�FTLZV:��p
��԰�75��p���wy�b���������#�y��k�:B�?!��c�G%�D?Y��8�!�J��ܔCi��!�`C�JO�;J	ŎF�*��`��� U�'�V�R������<����4r䴚�m���c���Q �5IG��Qoױ�������=hO�K#P�zn��no˝(��5��H      �   �   x�u�;�0E��^E6`kތ3{4�iB ��GH|֏l���.�	���Q.�/HQ���7n{�O���u� ��(�"fZ�:��u7��v����1*:=���kQTI��n��l*�#f5p��|m�ɏ�{�_�0�     