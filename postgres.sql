PGDMP     +                    v            postgres    10.5    10.5 c    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            �           1262    13267    postgres    DATABASE     z   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE postgres;
             postgres    false            �           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                  postgres    false    3280                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                        3079    13253    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false            �           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1            �            1259    16612    car    TABLE     �  CREATE TABLE public.car (
    car_id integer NOT NULL,
    make integer,
    model integer,
    variant integer,
    vehicle_type integer,
    fuel_type integer,
    transmission_type integer,
    insurance_type integer,
    insurance integer,
    exterior_color integer,
    mileage numeric,
    make_year numeric,
    owners numeric,
    cost_price numeric,
    purchased_from integer,
    purchased_on date,
    selling_price numeric,
    sold_to integer,
    sold_on date,
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
    total_cost integer DEFAULT 0,
    total_income integer DEFAULT 0
);
    DROP TABLE public.car;
       public         postgres    false    3            �            1259    16610    car_car_id_seq    SEQUENCE     �   CREATE SEQUENCE public.car_car_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.car_car_id_seq;
       public       postgres    false    217    3            �           0    0    car_car_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.car_car_id_seq OWNED BY public.car.car_id;
            public       postgres    false    216            �            1259    16604    client    TABLE     _  CREATE TABLE public.client (
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
    investment_records json[],
    available_balance integer DEFAULT 0,
    total_investment integer DEFAULT 0,
    total_expenses integer DEFAULT 0
);
    DROP TABLE public.client;
       public         postgres    false    3            �            1259    16602    client_client_id_seq    SEQUENCE     �   CREATE SEQUENCE public.client_client_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.client_client_id_seq;
       public       postgres    false    3    215            �           0    0    client_client_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.client_client_id_seq OWNED BY public.client.client_id;
            public       postgres    false    214            �            1259    16486    color    TABLE       CREATE TABLE public.color (
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer,
    color_id integer NOT NULL
);
    DROP TABLE public.color;
       public         postgres    false    3            �            1259    16578    color_color_id_seq    SEQUENCE     �   CREATE SEQUENCE public.color_color_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.color_color_id_seq;
       public       postgres    false    3    198            �           0    0    color_color_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.color_color_id_seq OWNED BY public.color.color_id;
            public       postgres    false    211            �            1259    16667    expenses    TABLE       CREATE TABLE public.expenses (
    expense_id integer NOT NULL,
    name character varying(50),
    created_by integer,
    create_date timestamp without time zone,
    updated_by integer,
    update_date timestamp without time zone,
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.expenses;
       public         postgres    false    3            �            1259    16665    expenses_expense_id_seq    SEQUENCE     �   CREATE SEQUENCE public.expenses_expense_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.expenses_expense_id_seq;
       public       postgres    false    219    3            �           0    0    expenses_expense_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.expenses_expense_id_seq OWNED BY public.expenses.expense_id;
            public       postgres    false    218            �            1259    16492 	   fuel_type    TABLE     '  CREATE TABLE public.fuel_type (
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer,
    fuel_type_id integer NOT NULL
);
    DROP TABLE public.fuel_type;
       public         postgres    false    3            �            1259    16565    fuel_type_fuel_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.fuel_type_fuel_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.fuel_type_fuel_type_id_seq;
       public       postgres    false    3    199            �           0    0    fuel_type_fuel_type_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.fuel_type_fuel_type_id_seq OWNED BY public.fuel_type.fuel_type_id;
            public       postgres    false    209            �            1259    16509 	   insurance    TABLE     '  CREATE TABLE public.insurance (
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer,
    insurance_id integer NOT NULL
);
    DROP TABLE public.insurance;
       public         postgres    false    3            �            1259    16590    insurance_insurance_id_seq    SEQUENCE     �   CREATE SEQUENCE public.insurance_insurance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.insurance_insurance_id_seq;
       public       postgres    false    3    201            �           0    0    insurance_insurance_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.insurance_insurance_id_seq OWNED BY public.insurance.insurance_id;
            public       postgres    false    212            �            1259    16503    insurance_type    TABLE     1  CREATE TABLE public.insurance_type (
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer,
    insurance_type_id integer NOT NULL
);
 "   DROP TABLE public.insurance_type;
       public         postgres    false    3            �            1259    16571 $   insurance_type_insurance_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.insurance_type_insurance_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ;   DROP SEQUENCE public.insurance_type_insurance_type_id_seq;
       public       postgres    false    200    3            �           0    0 $   insurance_type_insurance_type_id_seq    SEQUENCE OWNED BY     m   ALTER SEQUENCE public.insurance_type_insurance_type_id_seq OWNED BY public.insurance_type.insurance_type_id;
            public       postgres    false    210            �            1259    16451    make    TABLE       CREATE TABLE public.make (
    make_id integer NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer
);
    DROP TABLE public.make;
       public         postgres    false    3            �            1259    16449    make_make_id_seq    SEQUENCE     �   CREATE SEQUENCE public.make_make_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.make_make_id_seq;
       public       postgres    false    3    197            �           0    0    make_make_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.make_make_id_seq OWNED BY public.make.make_id;
            public       postgres    false    196            �            1259    16515    model    TABLE       CREATE TABLE public.model (
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer,
    model_id integer NOT NULL
);
    DROP TABLE public.model;
       public         postgres    false    3            �            1259    16545    model_model_id_seq    SEQUENCE     �   CREATE SEQUENCE public.model_model_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.model_model_id_seq;
       public       postgres    false    3    202            �           0    0    model_model_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.model_model_id_seq OWNED BY public.model.model_id;
            public       postgres    false    206            �            1259    16721    transaction_details    TABLE       CREATE TABLE public.transaction_details (
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
    balance integer
);
 '   DROP TABLE public.transaction_details;
       public         postgres    false    3            �            1259    16729    transaction_type    TABLE     �   CREATE TABLE public.transaction_type (
    transaction_type_id integer NOT NULL,
    name character varying(100),
    mode character varying(10),
    is_hidden boolean DEFAULT false
);
 $   DROP TABLE public.transaction_type;
       public         postgres    false    3            �            1259    16727    transaction_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transaction_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.transaction_type_id_seq;
       public       postgres    false    223    3            �           0    0    transaction_type_id_seq    SEQUENCE OWNED BY     d   ALTER SEQUENCE public.transaction_type_id_seq OWNED BY public.transaction_type.transaction_type_id;
            public       postgres    false    222            �            1259    16719    transasction_details_Id_seq    SEQUENCE     �   CREATE SEQUENCE public."transasction_details_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 4   DROP SEQUENCE public."transasction_details_Id_seq";
       public       postgres    false    3    221            �           0    0    transasction_details_Id_seq    SEQUENCE OWNED BY     p   ALTER SEQUENCE public."transasction_details_Id_seq" OWNED BY public.transaction_details.transaction_details_id;
            public       postgres    false    220            �            1259    16521    transmission_type    TABLE     P  CREATE TABLE public.transmission_type (
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
       public         postgres    false    3            �            1259    16596 *   transmission_type_transmission_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.transmission_type_transmission_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 A   DROP SEQUENCE public.transmission_type_transmission_type_id_seq;
       public       postgres    false    203    3            �           0    0 *   transmission_type_transmission_type_id_seq    SEQUENCE OWNED BY     y   ALTER SEQUENCE public.transmission_type_transmission_type_id_seq OWNED BY public.transmission_type.transmission_type_id;
            public       postgres    false    213            �            1259    16527    variant    TABLE     #  CREATE TABLE public.variant (
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer,
    variant_id integer NOT NULL
);
    DROP TABLE public.variant;
       public         postgres    false    3            �            1259    16553    variant_variant_id_seq    SEQUENCE     �   CREATE SEQUENCE public.variant_variant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.variant_variant_id_seq;
       public       postgres    false    204    3            �           0    0    variant_variant_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.variant_variant_id_seq OWNED BY public.variant.variant_id;
            public       postgres    false    207            �            1259    16533    vehicle_type    TABLE     -  CREATE TABLE public.vehicle_type (
    is_deleted boolean DEFAULT false NOT NULL,
    created_by integer,
    create_date timestamp without time zone,
    update_date timestamp without time zone,
    name character varying(50) NOT NULL,
    updated_by integer,
    vehicle_type_id integer NOT NULL
);
     DROP TABLE public.vehicle_type;
       public         postgres    false    3            �            1259    16559     vehicle_type_vehicle_type_id_seq    SEQUENCE     �   CREATE SEQUENCE public.vehicle_type_vehicle_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.vehicle_type_vehicle_type_id_seq;
       public       postgres    false    3    205            �           0    0     vehicle_type_vehicle_type_id_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.vehicle_type_vehicle_type_id_seq OWNED BY public.vehicle_type.vehicle_type_id;
            public       postgres    false    208                       2604    16615 
   car car_id    DEFAULT     h   ALTER TABLE ONLY public.car ALTER COLUMN car_id SET DEFAULT nextval('public.car_car_id_seq'::regclass);
 9   ALTER TABLE public.car ALTER COLUMN car_id DROP DEFAULT;
       public       postgres    false    216    217    217                       2604    16607    client client_id    DEFAULT     t   ALTER TABLE ONLY public.client ALTER COLUMN client_id SET DEFAULT nextval('public.client_client_id_seq'::regclass);
 ?   ALTER TABLE public.client ALTER COLUMN client_id DROP DEFAULT;
       public       postgres    false    215    214    215                       2604    16580    color color_id    DEFAULT     p   ALTER TABLE ONLY public.color ALTER COLUMN color_id SET DEFAULT nextval('public.color_color_id_seq'::regclass);
 =   ALTER TABLE public.color ALTER COLUMN color_id DROP DEFAULT;
       public       postgres    false    211    198            %           2604    16670    expenses expense_id    DEFAULT     z   ALTER TABLE ONLY public.expenses ALTER COLUMN expense_id SET DEFAULT nextval('public.expenses_expense_id_seq'::regclass);
 B   ALTER TABLE public.expenses ALTER COLUMN expense_id DROP DEFAULT;
       public       postgres    false    218    219    219                       2604    16567    fuel_type fuel_type_id    DEFAULT     �   ALTER TABLE ONLY public.fuel_type ALTER COLUMN fuel_type_id SET DEFAULT nextval('public.fuel_type_fuel_type_id_seq'::regclass);
 E   ALTER TABLE public.fuel_type ALTER COLUMN fuel_type_id DROP DEFAULT;
       public       postgres    false    209    199                       2604    16592    insurance insurance_id    DEFAULT     �   ALTER TABLE ONLY public.insurance ALTER COLUMN insurance_id SET DEFAULT nextval('public.insurance_insurance_id_seq'::regclass);
 E   ALTER TABLE public.insurance ALTER COLUMN insurance_id DROP DEFAULT;
       public       postgres    false    212    201                       2604    16573     insurance_type insurance_type_id    DEFAULT     �   ALTER TABLE ONLY public.insurance_type ALTER COLUMN insurance_type_id SET DEFAULT nextval('public.insurance_type_insurance_type_id_seq'::regclass);
 O   ALTER TABLE public.insurance_type ALTER COLUMN insurance_type_id DROP DEFAULT;
       public       postgres    false    210    200                       2604    16454    make make_id    DEFAULT     l   ALTER TABLE ONLY public.make ALTER COLUMN make_id SET DEFAULT nextval('public.make_make_id_seq'::regclass);
 ;   ALTER TABLE public.make ALTER COLUMN make_id DROP DEFAULT;
       public       postgres    false    197    196    197                       2604    16547    model model_id    DEFAULT     p   ALTER TABLE ONLY public.model ALTER COLUMN model_id SET DEFAULT nextval('public.model_model_id_seq'::regclass);
 =   ALTER TABLE public.model ALTER COLUMN model_id DROP DEFAULT;
       public       postgres    false    206    202            '           2604    16724 *   transaction_details transaction_details_id    DEFAULT     �   ALTER TABLE ONLY public.transaction_details ALTER COLUMN transaction_details_id SET DEFAULT nextval('public."transasction_details_Id_seq"'::regclass);
 Y   ALTER TABLE public.transaction_details ALTER COLUMN transaction_details_id DROP DEFAULT;
       public       postgres    false    220    221    221            (           2604    16732 $   transaction_type transaction_type_id    DEFAULT     �   ALTER TABLE ONLY public.transaction_type ALTER COLUMN transaction_type_id SET DEFAULT nextval('public.transaction_type_id_seq'::regclass);
 S   ALTER TABLE public.transaction_type ALTER COLUMN transaction_type_id DROP DEFAULT;
       public       postgres    false    222    223    223                       2604    16598 &   transmission_type transmission_type_id    DEFAULT     �   ALTER TABLE ONLY public.transmission_type ALTER COLUMN transmission_type_id SET DEFAULT nextval('public.transmission_type_transmission_type_id_seq'::regclass);
 U   ALTER TABLE public.transmission_type ALTER COLUMN transmission_type_id DROP DEFAULT;
       public       postgres    false    213    203                       2604    16555    variant variant_id    DEFAULT     x   ALTER TABLE ONLY public.variant ALTER COLUMN variant_id SET DEFAULT nextval('public.variant_variant_id_seq'::regclass);
 A   ALTER TABLE public.variant ALTER COLUMN variant_id DROP DEFAULT;
       public       postgres    false    207    204                       2604    16561    vehicle_type vehicle_type_id    DEFAULT     �   ALTER TABLE ONLY public.vehicle_type ALTER COLUMN vehicle_type_id SET DEFAULT nextval('public.vehicle_type_vehicle_type_id_seq'::regclass);
 K   ALTER TABLE public.vehicle_type ALTER COLUMN vehicle_type_id DROP DEFAULT;
       public       postgres    false    208    205            �          0    16612    car 
   TABLE DATA               �  COPY public.car (car_id, make, model, variant, vehicle_type, fuel_type, transmission_type, insurance_type, insurance, exterior_color, mileage, make_year, owners, cost_price, purchased_from, purchased_on, selling_price, sold_to, sold_on, created_by, create_date, updated_by, update_date, is_deleted, is_flooded, is_accidental, insurance_year, make_month, interior_color, fuel_economy, description, is_sold, license_plate, total_cost, total_income) FROM stdin;
    public       postgres    false    217    |       �          0    16604    client 
   TABLE DATA               �   COPY public.client (client_id, name, phone, email, address, city, state, pin, created_by, create_date, updated_by, update_date, is_investor, investment_records, available_balance, total_investment, total_expenses) FROM stdin;
    public       postgres    false    215   |       �          0    16486    color 
   TABLE DATA               m   COPY public.color (is_deleted, created_by, create_date, update_date, name, updated_by, color_id) FROM stdin;
    public       postgres    false    198   :|       �          0    16667    expenses 
   TABLE DATA               r   COPY public.expenses (expense_id, name, created_by, create_date, updated_by, update_date, is_deleted) FROM stdin;
    public       postgres    false    219   �|       �          0    16492 	   fuel_type 
   TABLE DATA               u   COPY public.fuel_type (is_deleted, created_by, create_date, update_date, name, updated_by, fuel_type_id) FROM stdin;
    public       postgres    false    199   }       �          0    16509 	   insurance 
   TABLE DATA               u   COPY public.insurance (is_deleted, created_by, create_date, update_date, name, updated_by, insurance_id) FROM stdin;
    public       postgres    false    201   (}       �          0    16503    insurance_type 
   TABLE DATA                  COPY public.insurance_type (is_deleted, created_by, create_date, update_date, name, updated_by, insurance_type_id) FROM stdin;
    public       postgres    false    200   E}       �          0    16451    make 
   TABLE DATA               k   COPY public.make (make_id, is_deleted, created_by, create_date, update_date, name, updated_by) FROM stdin;
    public       postgres    false    197   b}       �          0    16515    model 
   TABLE DATA               m   COPY public.model (is_deleted, created_by, create_date, update_date, name, updated_by, model_id) FROM stdin;
    public       postgres    false    202   }       �          0    16721    transaction_details 
   TABLE DATA               �   COPY public.transaction_details (transaction_details_id, transaction_type_id, car_id, investor_id, description, created_by, create_date, updated_by, update_date, date, expense_id, transaction_type_mode, credit, debit, balance) FROM stdin;
    public       postgres    false    221   �}       �          0    16729    transaction_type 
   TABLE DATA               V   COPY public.transaction_type (transaction_type_id, name, mode, is_hidden) FROM stdin;
    public       postgres    false    223   �}       �          0    16521    transmission_type 
   TABLE DATA               �   COPY public.transmission_type (is_deleted, created_by, create_date, update_date, name, updated_by, transmission_type_id, "isVisible") FROM stdin;
    public       postgres    false    203   J~       �          0    16527    variant 
   TABLE DATA               q   COPY public.variant (is_deleted, created_by, create_date, update_date, name, updated_by, variant_id) FROM stdin;
    public       postgres    false    204   g~       �          0    16533    vehicle_type 
   TABLE DATA               {   COPY public.vehicle_type (is_deleted, created_by, create_date, update_date, name, updated_by, vehicle_type_id) FROM stdin;
    public       postgres    false    205   �~       �           0    0    car_car_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.car_car_id_seq', 29, true);
            public       postgres    false    216            �           0    0    client_client_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.client_client_id_seq', 62, true);
            public       postgres    false    214            �           0    0    color_color_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.color_color_id_seq', 13, true);
            public       postgres    false    211            �           0    0    expenses_expense_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.expenses_expense_id_seq', 3, true);
            public       postgres    false    218            �           0    0    fuel_type_fuel_type_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.fuel_type_fuel_type_id_seq', 6, true);
            public       postgres    false    209            �           0    0    insurance_insurance_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.insurance_insurance_id_seq', 6, true);
            public       postgres    false    212            �           0    0 $   insurance_type_insurance_type_id_seq    SEQUENCE SET     R   SELECT pg_catalog.setval('public.insurance_type_insurance_type_id_seq', 6, true);
            public       postgres    false    210            �           0    0    make_make_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.make_make_id_seq', 17, true);
            public       postgres    false    196            �           0    0    model_model_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.model_model_id_seq', 7, true);
            public       postgres    false    206            �           0    0    transaction_type_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.transaction_type_id_seq', 10, true);
            public       postgres    false    222            �           0    0    transasction_details_Id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public."transasction_details_Id_seq"', 808, true);
            public       postgres    false    220            �           0    0 *   transmission_type_transmission_type_id_seq    SEQUENCE SET     X   SELECT pg_catalog.setval('public.transmission_type_transmission_type_id_seq', 8, true);
            public       postgres    false    213            �           0    0    variant_variant_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.variant_variant_id_seq', 4, true);
            public       postgres    false    207            �           0    0     vehicle_type_vehicle_type_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.vehicle_type_vehicle_type_id_seq', 6, true);
            public       postgres    false    208            /           2606    16620    car car1_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.car
    ADD CONSTRAINT car1_pkey PRIMARY KEY (car_id);
 7   ALTER TABLE ONLY public.car DROP CONSTRAINT car1_pkey;
       public         postgres    false    217            -           2606    16609    client client_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.client
    ADD CONSTRAINT client_pkey PRIMARY KEY (client_id);
 <   ALTER TABLE ONLY public.client DROP CONSTRAINT client_pkey;
       public         postgres    false    215            1           2606    16672    expenses expenses_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.expenses
    ADD CONSTRAINT expenses_pkey PRIMARY KEY (expense_id);
 @   ALTER TABLE ONLY public.expenses DROP CONSTRAINT expenses_pkey;
       public         postgres    false    219            +           2606    16459    make make_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.make
    ADD CONSTRAINT make_pkey PRIMARY KEY (make_id);
 8   ALTER TABLE ONLY public.make DROP CONSTRAINT make_pkey;
       public         postgres    false    197            5           2606    16734 &   transaction_type transaction_type_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.transaction_type
    ADD CONSTRAINT transaction_type_pkey PRIMARY KEY (transaction_type_id);
 P   ALTER TABLE ONLY public.transaction_type DROP CONSTRAINT transaction_type_pkey;
       public         postgres    false    223            3           2606    16726 -   transaction_details transasction_details_pkey 
   CONSTRAINT        ALTER TABLE ONLY public.transaction_details
    ADD CONSTRAINT transasction_details_pkey PRIMARY KEY (transaction_details_id);
 W   ALTER TABLE ONLY public.transaction_details DROP CONSTRAINT transasction_details_pkey;
       public         postgres    false    221            �      x������ � �      �      x������ � �      �   K   x�K�4�420��50�52Q04�22�2��3561�4���,JMQ&\iؔ�Y���Y��$唦�hS�=... X��      �   f   x�m�1�  ��| �VD�G0C����䦻cSME-�y�B�59MVqY�8ィ!�EK�{/=d�`ގ����Q̑l6!4��:�d\">,      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x�3�t�(H�+N�LIM�,�L��t.JM�,QH�LL�AHXp:'g`�r:��%�%�bȘ�e�R�S3����`Á���I�܀U��3�,��$75�n�1g@Q~�	UV�e��_\UP����� ��K�      �      x������ � �      �      x������ � �      �      x������ � �     